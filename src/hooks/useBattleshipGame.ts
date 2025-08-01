import { useState, useCallback } from "react";
import { GameState, CellState, Ship } from "@/types/battleship";
import { gameData } from "@/data/gameData";

const BOARD_SIZE = 10;

export const useBattleshipGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const board: CellState[][] = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(CellState.Water));

    return {
      board,
      ships: gameData.layout,
      hitPositions: new Set<string>(),
      sunkShips: new Set<string>(),
      isGameOver: false,
      shots: 0,
    };
  });

  const getPositionKey = (x: number, y: number): string => `${x},${y}`;

  const isShipAtPosition = useCallback(
    (x: number, y: number): Ship | null => {
      return (
        gameState.ships.find((ship) =>
          ship.positions.some((pos) => pos[0] === x && pos[1] === y)
        ) || null
      );
    },
    [gameState.ships]
  );

  const fireAt = useCallback(
    (x: number, y: number) => {
      if (gameState.isGameOver) return;

      const positionKey = getPositionKey(x, y);

      // Checks if already fired at this position
      if (gameState.board[y][x] !== CellState.Water) return;

      setGameState((prevState) => {
        const newBoard = prevState.board.map((row) => [...row]);
        const newHitPositions = new Set(prevState.hitPositions);
        const newSunkShips = new Set(prevState.sunkShips);

        const ship = isShipAtPosition(x, y);

        if (ship) {
          // Checks if a ship was hit
          newBoard[y][x] = CellState.Hit;
          newHitPositions.add(positionKey);

          const isShipSunk = ship.positions.every((pos) =>
            newHitPositions.has(getPositionKey(pos[0], pos[1]))
          );

          if (isShipSunk) {
            newSunkShips.add(ship.ship);
            // Mark all ship positions as sunk (when the whole ship is wrecked)
            ship.positions.forEach((pos) => {
              newBoard[pos[1]][pos[0]] = CellState.Sunk;
            });
          }
        } else {
          // Miss
          newBoard[y][x] = CellState.Miss;
        }

        const isNewGameOver = prevState.ships.every((ship) =>
          ship.positions.every((pos) =>
            newHitPositions.has(getPositionKey(pos[0], pos[1]))
          )
        );

        return {
          ...prevState,
          board: newBoard,
          hitPositions: newHitPositions,
          sunkShips: newSunkShips,
          isGameOver: isNewGameOver,
          shots: prevState.shots + 1,
        };
      });
    },
    [gameState.isGameOver, gameState.board, isShipAtPosition]
  );

  const resetGame = useCallback(() => {
    const board: CellState[][] = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(CellState.Water));

    setGameState({
      board,
      ships: gameData.layout,
      hitPositions: new Set<string>(),
      sunkShips: new Set<string>(),
      isGameOver: false,
      shots: 0,
    });
  }, []);

  return {
    gameState,
    fireAt,
    resetGame,
    BOARD_SIZE,
  };
};
