# Changelog

All notable changes to `double-eighteen-react` are documented here. This project
adheres to [Semantic Versioning](https://semver.org/) and the format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.4.0] - 2026-07-14

### Added

- **Initial release.** React components extracted from `double-eighteen@0.3.x`, now
  built on top of the headless [`double-eighteen`](https://www.npmjs.com/package/double-eighteen)
  engine (`>=0.4.0`).
- Components: `DominoTile`, `DominoHalf`, `DefaultPip`, `DominoTrain`, `DominoHub`,
  `MexicanTrainGame`, the `DoubleEighteen` / `DoubleFifteen` / `DoubleTwelve` /
  `DoubleNine` set presets, `DominoThemeProvider` / `useDominoTheme`, and the
  pan/zoom `Viewport`.

### Notes

- Peer dependencies: `double-eighteen >=0.4.0`, `react >=18`, `react-dom >=18`.
- All rules, AI, and layout/geometry math live in `double-eighteen`; this package is
  purely the React rendering layer.
