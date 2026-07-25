import { FC, useMemo } from 'react';
import {
  computeLineLayout,
  computeTrainTree,
  flattenSegments,
  halfExtentAlongTrain,
  type DominoValue,
  type LineArmData,
  type LineEndId,
  type PipColorMap,
} from 'double-eighteen';
import { DominoTile } from './DominoTile';
import { DominoTrain } from './DominoTrain';

export interface DominoLineProps {
  centerX: number;
  centerY: number;
  /** Spinner or seed tile; null for empty board. */
  center: DominoValue | null;
  arms: readonly LineArmData[];
  layoutStyle?: 'offset' | 'linear';
  pipColors?: PipColorMap;
  maxPips?: number;
  /** Optional highlight of playable ends (accessibility / UI). */
  highlightEnds?: readonly LineEndId[];
  onEndActivate?: (end: LineEndId) => void;
  /**
   * Accessible name for an end control. Composed boards (nested hubs) must
   * override this, otherwise every hub announces the same four end names.
   */
  endLabel?: (end: LineEndId) => string;
  /** Accessible name for the whole line group. */
  groupLabel?: string;
}

function isDouble(tile: DominoValue): boolean {
  return tile.value1 === tile.value2;
}

export const DominoLine: FC<DominoLineProps> = ({
  centerX,
  centerY,
  center,
  arms,
  layoutStyle = 'linear',
  pipColors,
  maxPips = 6,
  highlightEnds,
  onEndActivate,
  endLabel,
  groupLabel = 'Classic domino line',
}) => {
  const layout = useMemo(
    () =>
      computeLineLayout({
        centerX,
        centerY,
        center,
        arms,
      }),
    [centerX, centerY, center, arms]
  );

  const highlight = new Set(highlightEnds ?? []);
  const centerIsDouble = center ? isDouble(center) : true;

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      role="group"
      aria-label={groupLabel}
    >
      {center ? (
        <div
          style={{
            position: 'absolute',
            left: centerX - 30,
            top: centerY - 60,
            zIndex: 10,
            // Spinner upright; seed (non-double) on its side for left/right play.
            transform: centerIsDouble ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        >
          <DominoTile
            value1={center.value1}
            value2={center.value2}
            maxPips={maxPips}
            width={60}
            height={120}
            backgroundColor="white"
            pipColor="black"
            pipColors={pipColors}
            borderColor="#333"
          />
        </div>
      ) : null}

      {layout.arms.map((arm) => {
        const tree = flattenSegments(
          computeTrainTree({
            startX: arm.startX,
            startY: arm.startY,
            angle: arm.angle,
            branch: { dominoes: [...arm.dominoes] },
            layoutStyle,
            leadGap: arm.leadGap,
          })
        );
        const tip = tree.at(-1);
        const radians = (arm.angle * Math.PI) / 180;
        const dirX = Math.cos(radians);
        const dirY = Math.sin(radians);
        // Sit just past the open face so the control isn't buried under the tile.
        let highlightX = arm.highlightX;
        let highlightY = arm.highlightY;
        if (tip) {
          const last = arm.dominoes.at(-1);
          const tipHalf = halfExtentAlongTrain(
            last ? isDouble(last) : false
          );
          highlightX = tip.x + dirX * (tipHalf + 22);
          highlightY = tip.y + dirY * (tipHalf + 22);
        }

        return (
          <div key={arm.end} style={{ position: 'absolute', inset: 0 }}>
            <DominoTrain
              startX={arm.startX}
              startY={arm.startY}
              angle={arm.angle}
              leadGap={arm.leadGap}
              trainData={{
                dominoes: [...arm.dominoes],
                playerId:
                  arm.end === 'left'
                    ? 0
                    : arm.end === 'right'
                      ? 1
                      : arm.end === 'top'
                        ? 2
                        : 3,
                isPublic: true,
              }}
              layoutStyle={layoutStyle}
              pipColors={pipColors}
              maxPips={maxPips}
            />
            {onEndActivate && highlight.has(arm.end) ? (
              <button
                type="button"
                aria-label={endLabel?.(arm.end) ?? `Play on ${arm.end} end`}
                data-no-pan
                onPointerDown={(event) => {
                  // Keep TableViewport from treating this as a pan start.
                  event.stopPropagation();
                }}
                onClick={() => onEndActivate(arm.end)}
                style={{
                  position: 'absolute',
                  left: highlightX - 22,
                  top: highlightY - 22,
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '2px solid #38bdf8',
                  background: 'rgba(56, 189, 248, 0.35)',
                  boxShadow: '0 0 12px rgba(56, 189, 248, 0.45)',
                  cursor: 'pointer',
                  zIndex: 30,
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default DominoLine;
