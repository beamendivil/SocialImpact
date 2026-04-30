# Live Demo

View the deployed project here: [https://beamendivil.github.io/SocialImpact/](https://beamendivil.github.io/SocialImpact/)

# Project Criteria

This project meets the following criteria for Stage 1 acceptance:

- **No use of `overflow: hidden`**: Ensures true responsiveness at 320px width and prevents content clipping.
- **Responsive Design**: All layouts and components are tested to work at a minimum width of 320px.
- **BEM CSS Naming**: All CSS classes follow the strict block\_\_element--modifier convention.
- **Semantic HTML**: Uses <header>, <nav>, <main>, <section>, and other semantic tags appropriately.
- **API Service Layer**: All API calls are handled via native fetch in a dedicated service file.
- **Stubbed Auth & API**: Simulated Promises for authentication and community goal saving allow review before backend is live.
- **Vite Config**: The base path is set to `/SocialImpact/` for correct GitHub Pages deployment.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
