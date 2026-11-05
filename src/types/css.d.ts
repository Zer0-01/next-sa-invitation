// Lets TypeScript accept stylesheet imports such as `import "./globals.css"`.
// Newer TypeScript versions check side-effect imports by default
// (noUncheckedSideEffectImports), and Next.js does not declare `.css` itself.
declare module "*.css";
