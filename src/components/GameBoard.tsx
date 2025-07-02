import React from "react";
import { useGame } from "../context/GameContext";
import { BingoCards } from "./BingoCards";
import { NumberDrawer } from "./NumberDrawer";
import { GameControls } from "./GameControls";
import { PlayerSetup } from "./PlayerSetup";
import { RulesDrawer } from "./RulesDrawer";
import { WinnerCelebration } from "./WinnerCelebration";

export const GameBoard: React.FC = () => {
  const { gameStatus, showRules, winners } = useGame();

  return (
    <div className="space-y-8">
      {gameStatus === "setup" && <PlayerSetup />}

      {gameStatus !== "setup" && (
        <>
          <GameControls />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2">
              <BingoCards />
            </div>

            <div className="col-span-1">
              <NumberDrawer />
            </div>
          </div>

          {showRules && <RulesDrawer />}

          {winners.length > 0 && <WinnerCelebration />}
        </>
      )}
    </div>
  );
};
