import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameData, GameState } from "@/types/battleship";
import { gameData } from "@/data/gameData";
import CustomBattleIcon from "./CustomBattleIcon";

interface GameStatsProps {
  gameState: GameState;
}

const GameStats: React.FC<GameStatsProps> = memo(({ gameState }) => {
  const totalShips = gameData.layout.length;
  const shipsRemaining = totalShips - gameState.sunkShips.size;
  const accuracy = useMemo(
    () =>
      gameState.shots > 0
        ? Math.round((gameState.hitPositions.size / gameState.shots) * 100)
        : 0,
    [gameState.hitPositions, gameState.shots]
  );

  const getShipDisplayName = (shipName: string) => {
    return shipName.charAt(0).toUpperCase() + shipName.slice(1);
  };

  const getShipIcon = (shipName: keyof GameData["shipTypes"]) => {
    const iconName = gameData.shipTypes[shipName]?.iconName;
    if (!iconName) {
      return null;
    }

    return <CustomBattleIcon name={iconName} />;
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-card to-accent/20 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            Battle Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Shots Fired:</span>
              <p className="text-xl font-bold text-primary">
                {gameState.shots}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Accuracy:</span>
              <p className="text-xl font-bold text-primary">{accuracy}%</p>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-muted-foreground text-sm">
              Ships Remaining:
            </span>
            <p className="text-2xl font-bold text-ocean-deep">
              {shipsRemaining} / {totalShips}
            </p>
          </div>

          {gameState.isGameOver && (
            <Badge
              variant="secondary"
              className="w-full justify-center py-2 bg-primary text-primary-foreground"
            >
              Victory! All ships destroyed!
            </Badge>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-accent/20 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            Enemy Fleet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {gameData.layout.map((ship) => {
              const isSunk = gameState.sunkShips.has(ship.ship);
              const hitCount = ship.positions.filter((pos) =>
                gameState.hitPositions.has(`${pos[0]},${pos[1]}`)
              ).length;

              return (
                <div
                  key={ship.ship}
                  className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {getShipIcon(ship.ship)}
                    </span>
                    <span className="text-sm font-medium">
                      {getShipDisplayName(ship.ship)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({gameData.shipTypes[ship.ship].size} cells)
                    </span>
                  </div>

                  <Badge
                    variant={isSunk ? "destructive" : "outline"}
                    className={isSunk ? "bg-ship-sunk text-white" : ""}
                  >
                    {isSunk
                      ? "Sunk"
                      : `${hitCount}/${gameData.shipTypes[ship.ship].size}`}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default GameStats;
