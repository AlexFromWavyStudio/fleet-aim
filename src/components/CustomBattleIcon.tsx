import React from "react";
import AircraftIcon from "../assets/aircraft.png";
import Battleship from "../assets/battleship.png";
import Carrier from "../assets/carrier.png";
import Cruiser from "../assets/cruiser.png";
import HitSmall from "../assets/hit-small.png";
import Hit from "../assets/hit.png";
import MissSmall from "../assets/miss-small.png";
import Miss from "../assets/miss.png";
import Submarine from "../assets/submarine.png";

const icons = {
  aircraft: AircraftIcon,
  battleship: Battleship,
  carrier: Carrier,
  cruiser: Cruiser,
  "hit-small": HitSmall,
  hit: Hit,
  "miss-small": MissSmall,
  miss: Miss,
  submarine: Submarine,
} as const;

export interface CustomBattleIconProps {
  name: keyof typeof icons;
  alt?: string;
  size?: number;
}

const CustomBattleIcon: React.FC<CustomBattleIconProps> = ({
  name,
  alt,
  size = 32,
}) => {
  // In case the icon is not found, we can return a fallback or an error message
  const iconSrc: string | undefined = icons[name];

  if (!iconSrc) {
    return <span className="text-red-600">Invalid</span>;
  }

  return (
    <img
      src={iconSrc}
      alt={alt || name}
      width={size}
      height={size}
      style={{ display: "inline-block" }}
    />
  );
};

export default CustomBattleIcon;
