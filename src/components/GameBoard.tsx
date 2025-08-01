import { memo } from "react";
import { CellState } from "@/types/battleship";
import { cn } from "@/lib/utils";
import CustomBattleIcon from "./CustomBattleIcon";

interface GameBoardProps {
  board: CellState[][];
  onCellClick: (x: number, y: number) => void;
  boardSize: number;
}

const GameBoard = memo(({ board, onCellClick, boardSize }: GameBoardProps) => {
  const getCellStyles = (state: CellState) => {
    switch (state) {
      case CellState.Water:
        return "bg-water hover:bg-accent cursor-pointer";
      case CellState.Hit:
        return "bg-water";
      case CellState.Miss:
        return "bg-[#eef3f7] opacity-75";
      case CellState.Sunk:
        return "bg-ship-sunk border-ship-sunk shadow-inner";
      default:
        return "bg-water border-grid-line";
    }
  };

  const getCellContent = (state: CellState) => {
    switch (state) {
      case CellState.Hit:
        return <CustomBattleIcon name="hit" />;
      case CellState.Miss:
        return <CustomBattleIcon name="miss-small" />;
      case CellState.Sunk:
        return <CustomBattleIcon name="miss" size={24} />;
      default:
        return null;
    }
  };

  const cellSize = "clamp(1.5rem, 7vw, 2.5rem)";

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-max">
        <div className="flex">
          {/* Spacer for top-left corner */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{ width: cellSize, height: cellSize }}
          ></div>

          {/* Column labels */}
          <div
            className="grid shrink-0"
            style={{
              gridTemplateColumns: `repeat(${boardSize}, ${cellSize})`,
              gap: "0.25rem",
            }}
          >
            {Array.from({ length: boardSize }, (_, i) => (
              <div
                key={i}
                className="text-center font-semibold text-foreground flex items-center justify-center"
                style={{
                  width: cellSize,
                  height: cellSize,
                  fontSize: "clamp(0.5rem, 2.5vw, 0.875rem)",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          {/* Row labels */}
          <div className="flex flex-col shrink-0" style={{ gap: "0.25rem" }}>
            {Array.from({ length: boardSize }, (_, i) => (
              <div
                key={i}
                className="flex items-center justify-center font-semibold text-foreground"
                style={{
                  width: cellSize,
                  height: cellSize,
                  fontSize: "clamp(0.5rem, 2.5vw, 0.875rem)",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Game grid */}
          <div
            className="grid p-2 sm:p-4 bg-gradient-to-br from-ocean/20 to-ocean-deep/30 rounded-xl border-2 border-primary/30"
            style={{
              gridTemplateColumns: `repeat(${boardSize}, ${cellSize})`,
              gap: "0.25rem",
            }}
          >
            {board.map((row, y) =>
              row.map((cellState, x) => (
                <button
                  key={`${x}-${y}`}
                  onClick={() => onCellClick(x, y)}
                  disabled={cellState !== CellState.Water}
                  className={cn(
                    "border-2 rounded-md transition-all duration-200 font-bold flex items-center justify-center aspect-square",
                    getCellStyles(cellState),
                    cellState === CellState.Water &&
                      "hover:shadow-lg active:scale-95"
                  )}
                  style={{
                    width: "100%",
                    fontSize: "clamp(0.5rem, 2.5vw, 1rem)",
                  }}
                >
                  {getCellContent(cellState)}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

GameBoard.displayName = "GameBoard";

export default GameBoard;
