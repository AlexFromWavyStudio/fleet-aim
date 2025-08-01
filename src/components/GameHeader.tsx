import { memo } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface GameHeaderProps {
  onResetGame: () => void;
}

const GameHeader = memo(({ onResetGame }: GameHeaderProps) => {
  return (
    <div className="text-center space-y-4">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Battleship
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Hunt the enemy fleet! Click on the grid to fire at suspected ship
          locations. Sink all ships to claim victory.
        </p>
      </div>

      <Button
        onClick={onResetGame}
        variant="outline"
        className="bg-background/80 hover:bg-accent border-primary/30"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        New Game
      </Button>
    </div>
  );
});

GameHeader.displayName = "GameHeader";

export default GameHeader;
