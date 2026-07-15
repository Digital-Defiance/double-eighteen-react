import { FC, useEffect, useMemo } from 'react';
import { DominoTile } from './DominoTile';
import {
  DOMINO_HEIGHT,
  DOMINO_WIDTH,
  computeTrainTree,
  flattenSegments,
} from 'double-eighteen';
import { validateChickenFootChain } from 'double-eighteen';
import { TrainData } from 'double-eighteen';
import { PipColorMap } from 'double-eighteen';

/** True in dev/test, false in the production library bundle (Vite inlines it). */
const IS_DEV = (() => {
  try {
    return Boolean(import.meta.env?.DEV);
  } catch {
    return false;
  }
})();

interface DominoTrainProps {
  startX: number;
  startY: number;
  angle: number;
  trainData: TrainData;
  layoutStyle: 'offset' | 'linear';
  pipColors?: PipColorMap;
  maxPips?: number;
}

export const DominoTrain: FC<DominoTrainProps> = ({
  startX,
  startY,
  angle,
  trainData,
  layoutStyle,
  pipColors,
  maxPips = 18,
}) => {
  // Guard rail: a train must be a sequentially-correct chain (like-values
  // touching, toes connecting to their double). Rather than silently drawing a
  // broken train, surface the rule violations in dev. Never throws, so it can't
  // crash a host app's render in production.
  useEffect(() => {
    if (!IS_DEV) return;
    const result = validateChickenFootChain({
      dominoes: trainData.dominoes,
      feet: trainData.feet,
    });
    if (!result.valid) {
      console.warn(
        `DominoTrain: player ${trainData.playerId} train does not follow the rules:`,
        result.issues.map((issue) => issue.message)
      );
    }
  }, [trainData.dominoes, trainData.feet, trainData.playerId]);

  const trainLayout = useMemo(
    () =>
      flattenSegments(
        computeTrainTree({
          startX,
          startY,
          angle,
          branch: { dominoes: trainData.dominoes, feet: trainData.feet },
          layoutStyle,
        })
      ),
    [
      startX,
      startY,
      angle,
      trainData.dominoes,
      trainData.feet,
      layoutStyle,
    ]
  );

  return (
    <>
      {trainLayout.map((entry, index) => {
        const showMarker = trainData.isPublic;

        return (
          <div
            key={`main-train-${trainData.playerId}-${index}`}
            style={{
              position: 'absolute',
              left: `${entry.x - DOMINO_WIDTH / 2}px`,
              top: `${entry.y - DOMINO_HEIGHT / 2}px`,
              zIndex: 5,
            }}
          >
            <DominoTile
              value1={entry.value1}
              value2={entry.value2}
              maxPips={maxPips}
              width={DOMINO_WIDTH}
              height={DOMINO_HEIGHT}
              backgroundColor="white"
              pipColor="black"
              pipColors={pipColors}
              borderColor={showMarker ? 'red' : 'black'}
              rotation={entry.rotation}
            />
          </div>
        );
      })}
    </>
  );
};

export default DominoTrain;
