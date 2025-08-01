import { useBattleshipGame } from "@/hooks/useBattleshipGame";
import GameBoard from "@/components/GameBoard";
import GameStats from "@/components/GameStats";
import GameHeader from "@/components/GameHeader";
import CustomBattleIcon from "@/components/CustomBattleIcon";

// I wanted to use the same pages naming convention as in Next.js, so I named this file Index.tsx
// This is the main game page that combines the game board, stats, and header
const Index = () => {
  const { gameState, fireAt, resetGame, BOARD_SIZE } = useBattleshipGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-ocean/5 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <GameHeader onResetGame={resetGame} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex justify-center">
            <div className="w-full max-w-lg">
              <GameBoard
                board={gameState.board}
                onCellClick={fireAt}
                boardSize={BOARD_SIZE}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <GameStats gameState={gameState} />
          </div>
        </div>

        {/* Game Instructions */}
        <div className="max-w-3xl mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p>
            <strong>How to Play:</strong> Click on any water cell to fire.{" "}
            <CustomBattleIcon name="hit" /> = Hit,{" "}
            <CustomBattleIcon name="miss-small" /> = Miss,{" "}
            <CustomBattleIcon name="miss" /> = Ship Sunk
          </p>
          <p className="text-xs">Find and destroy all ships to win the game!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
