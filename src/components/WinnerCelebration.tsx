import React from "react";
import { useGame } from "../context/GameContext";
import { Trophy, Award, PartyPopper } from "lucide-react";

export const WinnerCelebration: React.FC = () => {
  const { winners, nextRound, round, clearWinners } = useGame();

  if (winners.length === 0) return null;

  const handleContinue = () => {
    clearWinners();
    nextRound();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full mx-4 relative z-10">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <Trophy size={64} className="text-yellow-400" />
        </div>
        <div className="text-center mb-6 pt-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#B020AB] to-[#5518C2] text-transparent bg-clip-text mb-2">
            BINGO!
          </h2>
          <div className="flex justify-center">
            <PartyPopper className="text-[#B020AB] animate-bounce" />
            <PartyPopper className="text-[#5518C2] animate-bounce delay-100" />
            <PartyPopper className="text-[#B020AB] animate-bounce delay-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mb-6">
          <h3 className="text-xl font-bold text-[#5518C2] mb-4 flex items-center justify-center">
            <Award className="mr-2" />
            Vencedor{winners.length > 1 ? "es" : ""} da rodada {round}!
          </h3>
          <div className="space-y-2">
            {winners.map((winner) => (
              <div
                key={winner.id}
                className="bg-white rounded-lg p-3 shadow-sm flex items-center justify-between"
              >
                <span className="font-semibold text-[#B020AB]">
                  {winner.playerName}
                </span>
                <Trophy size={20} className="text-yellow-500" />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleContinue}>
            Continuar para próxima rodada
          </button>
        </div>
      </div>
    </div>
  );
};
