// double-eighteen-react — React components for rendering dominoes, trains, and
// the Mexican Train hub. All rules/AI/layout math lives in the headless
// `double-eighteen` package, which this package depends on.

export { DominoTile } from './DominoTile';
export type { DominoTileProps } from './DominoTile';

export {
  DoubleEighteen,
  DoubleFifteen,
  DoubleTwelve,
  DoubleNine,
} from './DominoSetPresets';
export type { DoubleTwelveProps } from './DominoSetPresets';

export { MexicanTrainGame } from './MexicanTrainGame';
export { DominoHub } from './DominoHub';
export { DominoTrain } from './DominoTrain';
export { DominoThemeProvider, useDominoTheme } from './DominoThemeContext';
export type { DominoThemeProviderProps } from './DominoThemeContext';
export { DefaultPip } from './DefaultPip';
export { Viewport } from './Viewport';
export type { ViewportProps } from './Viewport';
