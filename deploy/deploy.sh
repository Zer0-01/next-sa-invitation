#!/usr/bin/env bash
# Deploys the invitation site. Installed on the server as
# /home/ubuntu/apps/sa-invitation-deploy/deploy.sh and bound to the CI deploy
# key with command="..." in ~/.ssh/authorized_keys, so that key can run nothing
# else.
#
# CI runs: ssh <host> "<env> <commit-sha>"  (arrives as SSH_ORIGINAL_COMMAND)
# with stdin = "<registry user> <GHCR token>" on the first line, then
# deploy/compose.yaml.
set -euo pipefail

root=/home/ubuntu/apps/sa-invitation-deploy

read -r env tag extra <<<"${SSH_ORIGINAL_COMMAND:-}" || true
case "${env:-}" in
  ustad) ;;
  *) echo "Unknown environment: '${env:-}'" >&2; exit 2 ;;
esac
if [[ ! "${tag:-}" =~ ^[0-9a-f]{40}$ || -n "${extra:-}" ]]; then
  echo "Expected: <environment> <40-char commit SHA>" >&2
  exit 2
fi

dir="$root/$env"
mkdir -p "$dir"
cd "$dir"

read -r registry_user token
cat >compose.yaml.new
mv compose.yaml.new compose.yaml

# Only one deploy at a time.
exec 9>.deploy.lock
flock 9

echo "$token" | docker login ghcr.io -u "$registry_user" --password-stdin >/dev/null
trap 'docker logout ghcr.io >/dev/null 2>&1 || true' EXIT

previous=$(cat release.env 2>/dev/null || true)
echo "IMAGE_TAG=$tag" >release.env

compose=(docker compose --env-file release.env)
"${compose[@]}" pull --quiet
if ! "${compose[@]}" up -d --remove-orphans --wait --wait-timeout 120; then
  echo "Deploy of $tag failed." >&2
  "${compose[@]}" logs --tail 80 website >&2 || true
  if [[ -n "$previous" ]]; then
    echo "Rolling back to ${previous#IMAGE_TAG=}." >&2
    echo "$previous" >release.env
    "${compose[@]}" up -d --remove-orphans --wait --wait-timeout 120 || true
  fi
  exit 1
fi

echo "$(date -u +%FT%TZ) $tag" >>deploy.log
# Drop invitation images no running container uses; GHCR keeps every build.
docker image prune -af --filter "label=org.opencontainers.image.source=https://github.com/Zer0-01/next-sa-invitation" >/dev/null
echo "Deployed $env at $tag."
