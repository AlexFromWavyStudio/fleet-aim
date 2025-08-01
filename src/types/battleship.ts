import { CustomBattleIconProps } from "@/components/CustomBattleIcon";

export interface ShipType {
  size: number;
  count: number;
  iconName: CustomBattleIconProps["name"];
}

export interface ShipTypes {
  carrier: ShipType;
  battleship: ShipType;
  cruiser: ShipType;
  submarine: ShipType;
  destroyer: ShipType;
}

export interface Position {
  0: number; // x coordinate
  1: number; // y coordinate
}

export interface Ship {
  ship: keyof ShipTypes;
  positions: Position[];
}

export interface GameData {
  shipTypes: ShipTypes;
  layout: Ship[];
}

export enum CellState {
  Water = "water",
  Hit = "hit",
  Miss = "miss",
  Sunk = "sunk",
}

export interface GameState {
  board: CellState[][];
  ships: Ship[];
  hitPositions: Set<string>;
  sunkShips: Set<string>;
  isGameOver: boolean;
  shots: number;
}
