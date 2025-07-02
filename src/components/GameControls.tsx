import React from "react";
import { useGame } from "../context/GameContext";
import { RefreshCw, Book, Award } from "lucide-react";

export const GameControls: React.FC = () => {
  const { resetGame, gameStatus, toggleRules, showRules, drawnNumbers, cards } =
    useGame();

  const anyWinners = cards.some((card) => card.hasWon);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">Status do jogo:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              gameStatus === "playing"
                ? "bg-green-100 text-green-800"
                : gameStatus === "finished"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {gameStatus === "playing"
              ? "Em andamento"
              : gameStatus === "finished"
              ? "Finalizado"
              : "Preparando"}
          </span>

          {drawnNumbers.length > 0 && (
            <span className="text-sm text-gray-500">
              {drawnNumbers.length}/75 números sorteados
            </span>
          )}

          {anyWinners && (
            <span className="flex items-center text-[#B020AB] font-medium">
              <Award size={16} className="mr-1" />
              {cards.filter((card) => card.hasWon).length} vencedor(es)
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="btn btn-secondary flex items-center gap-1"
            onClick={toggleRules}
          >
            <Book size={16} />
            {showRules ? "Fechar regras" : "Mostrar regras"}
          </button>

          <button
            className="btn btn-primary flex items-center gap-1"
            onClick={resetGame}
          >
            <RefreshCw size={16} />
            Novo jogo
          </button>
        </div>
      </div>
    </div>
  );
};
