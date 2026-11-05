# Deployment

Pushes to `ustad-main` deploy to https://nurinamirulsheart.keyplee.com.

## How a deploy works

`.github/workflows/ci-cd.yml` runs on pushes to `ustad-main` and pull requests
into it:

1. **Checks**: type check.
2. **Image** (`ustad-main` pushes only): builds the Dockerfile and pushes it to
   `ghcr.io/zer0-01/next-sa-invitation:<commit sha>` (and `:ustad`). The
   `USTAD_ENV` secret is mounted as `.env.production.local` for the build
   only. `NEXT_PUBLIC_*` values are inlined into the client bundle at build
   time, so changing one requires a new build. Restarting the container is
   not enough.
3. **Deploy**: SSHes to the server with a key that can only run `deploy.sh`,
   sending a short-lived GHCR token and `deploy/compose.yaml`. `deploy.sh`
   pulls the image, starts it and waits until it is healthy. If it never
   becomes healthy, it rolls back to the previous image tag.

Caddy (`/home/ubuntu/apps/infra`) terminates TLS and proxies the domain to
`sa-invitation-ustad:3000` on the shared `web` network.

## Server layout

```
/home/ubuntu/apps/sa-invitation-deploy/
  deploy.sh          # copy of deploy/deploy.sh; update it by hand when it changes
  ustad/
    compose.yaml     # written by each deploy
    release.env      # IMAGE_TAG currently deployed
    deploy.log       # one line per successful deploy
```

## One-time setup

### Server

```sh
install -D -m 755 deploy/deploy.sh /home/ubuntu/apps/sa-invitation-deploy/deploy.sh
ssh-keygen -t ed25519 -N '' -C sa-invitation-ci -f ~/.ssh/sa_invitation_deploy_ci
echo "command=\"/home/ubuntu/apps/sa-invitation-deploy/deploy.sh\",restrict $(cat ~/.ssh/sa_invitation_deploy_ci.pub)" >> ~/.ssh/authorized_keys
```

### GitHub (Settings → Environments, Secrets and variables → Actions)

- Environment `ustad`.
- Repository variable `DEPLOY_HOST`: the server's IP or hostname.
- Repository secret `DEPLOY_SSH_KEY`: contents of `~/.ssh/sa_invitation_deploy_ci`.
- Repository secret `DEPLOY_KNOWN_HOSTS`: output of
  `ssh-keyscan -t ed25519 <DEPLOY_HOST>`.
- Repository secret `USTAD_ENV`: the dotenv file with the six
  `NEXT_PUBLIC_FIREBASE_*` lines.

## Common tasks

Run these from `/home/ubuntu/apps/sa-invitation-deploy/ustad`:

```sh
cat release.env                                     # what's deployed
tail deploy.log                                     # deploy history
docker compose --env-file release.env logs -f       # logs
docker compose --env-file release.env restart       # restart
```

Roll back: re-run an older successful "CI/CD" workflow run from the Actions
tab, or set `IMAGE_TAG` in `release.env` to an older SHA and run
`docker compose --env-file release.env up -d --wait`.
