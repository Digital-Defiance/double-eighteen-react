import { render } from '@testing-library/react';
import { DominoHub } from './DominoHub';
import { TrainData } from 'double-eighteen';

const baseProps = {
  centerX: 500,
  centerY: 500,
  radius: 80,
  layoutStyle: 'linear' as const,
};

const TILE = '[data-testid="domino-tile"]';

describe('DominoHub', () => {
  it('renders the engine double in the center even with no trains', () => {
    const { container } = render(
      <DominoHub {...baseProps} playerCount={4} engineValue={12} trains={[]} />
    );
    expect(container.querySelectorAll('[data-testid="pip"]').length).toBe(24);
    expect(container.querySelectorAll(TILE).length).toBe(1);
  });

  it('renders a double-18 engine with 36 pips when maxPips is 18', () => {
    const { container } = render(
      <DominoHub
        {...baseProps}
        playerCount={4}
        engineValue={18}
        maxPips={18}
        trains={[]}
      />
    );
    expect(container.querySelectorAll('[data-testid="pip"]').length).toBe(36);
  });

  it('clamps train tile values to maxPips', () => {
    const trains: TrainData[] = [
      {
        playerId: 0,
        isPublic: false,
        dominoes: [{ value1: 18, value2: 17 }],
      },
    ];
    const { container } = render(
      <DominoHub
        {...baseProps}
        playerCount={2}
        engineValue={18}
        maxPips={18}
        trains={trains}
      />
    );
    // engine (36) + 17|18 tile (35) = 71 pips
    expect(container.querySelectorAll('[data-testid="pip"]').length).toBe(71);
  });

  it('always lays out at least eight train slots', () => {
    const trains: TrainData[] = [
      {
        playerId: 0,
        isPublic: false,
        dominoes: [{ value1: 12, value2: 5 }],
      },
    ];
    const { container } = render(
      <DominoHub {...baseProps} playerCount={2} engineValue={12} trains={trains} />
    );
    // engine tile + the single played tile in player 0's train.
    expect(container.querySelectorAll(TILE).length).toBe(2);
  });

  it('renders tiles for every populated train', () => {
    const trains: TrainData[] = [
      { playerId: 0, isPublic: false, dominoes: [{ value1: 12, value2: 1 }] },
      {
        playerId: 1,
        isPublic: true,
        dominoes: [
          { value1: 12, value2: 2 },
          { value1: 2, value2: 4 },
        ],
      },
    ];
    const { container } = render(
      <DominoHub {...baseProps} playerCount={8} engineValue={12} trains={trains} />
    );
    // engine (1) + train 0 (1) + train 1 (2) = 4 tiles.
    expect(container.querySelectorAll(TILE).length).toBe(4);
  });
});
