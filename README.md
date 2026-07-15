# double-eighteen-react

[![npm](https://img.shields.io/npm/v/double-eighteen-react.svg)](https://www.npmjs.com/package/double-eighteen-react)
[![downloads](https://img.shields.io/npm/dm/double-eighteen-react.svg)](https://www.npmjs.com/package/double-eighteen-react)
[![types](https://img.shields.io/npm/types/double-eighteen-react.svg)](https://www.npmjs.com/package/double-eighteen-react)
[![CI](https://github.com/Digital-Defiance/double-eighteen-react/actions/workflows/ci.yml/badge.svg)](https://github.com/Digital-Defiance/double-eighteen-react/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/double-eighteen-react.svg)](./LICENSE)

React components for [`double-eighteen`](https://www.npmjs.com/package/double-eighteen) — render dominoes, personal/community trains, and the Mexican Train hub.

### ▶ [Live demo & visual harness](https://digital-defiance.github.io/double-eighteen-react/)

All game rules, AI, and layout/geometry math live in the headless **`double-eighteen`** package. This package is purely the React rendering layer and depends on it.

```bash
npm install double-eighteen double-eighteen-react react react-dom
```

```tsx
import { DominoTile, DominoThemeProvider, MexicanTrainGame } from 'double-eighteen-react';
```

## Exports

- `DominoTile`, `DominoHalf` primitives and `DefaultPip`
- `DominoTrain`, `DominoHub`, `MexicanTrainGame`
- `DoubleEighteen` / `DoubleFifteen` / `DoubleTwelve` / `DoubleNine` set presets
- `DominoThemeProvider` / `useDominoTheme`
- `Viewport` (pan/zoom)

## Development

```bash
yarn install
yarn dev            # run the live demo / visual harness locally
yarn test           # unit tests (Vitest)
yarn typecheck      # tsc, no emit
yarn lint           # eslint
yarn build:lib      # build the npm package → dist/
yarn demo:build     # build the static demo → demo-dist/
```

The `dev/` (visual harness + demo app) and `e2e/` folders are for local component
development and are excluded from the published npm build. The demo is deployed to
GitHub Pages from `dev/` via `.github/workflows/pages.yml`.

> When developing inside the Warp monorepo the headless core resolves from the
> sibling `../double-eighteen/dist`; standalone it resolves from the published
> `double-eighteen` package on npm.
