import React from "react";
import { useGame } from "../context/GameContext";
import { ArrowRight } from "lucide-react";

export const NumberDrawer: React.FC = () => {
  const { drawNumber, currentNumberDrawn, drawnNumbers, gameStatus } =
    useGame();

  const getBingoLetter = (number: number): string => {
    if (number <= 15) return "B";
    if (number <= 30) return "I";
    if (number <= 45) return "N";
    if (number <= 60) return "G";
    return "O";
  };

  const getBackgroundColor = (number: number): string => {
    const letter = getBingoLetter(number);
    switch (letter) {
      case "B":
        return "#B020AB";
      case "I":
        return "#d36cce";
      case "N":
        return "#5518C2";
      case "G":
        return "#7f4cd7";
      case "O":
        return "#9333ea";
      default:
        return "#B020AB";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-[#5518C2] mb-4">
        Sortear números
      </h2>

      {/* Current number */}
      {currentNumberDrawn ? (
        <div className="flex flex-col items-center mb-6">
          <div
            className="bingo-ball mb-2"
            style={{ backgroundColor: getBackgroundColor(currentNumberDrawn) }}
          >
            {currentNumberDrawn}
          </div>
          <div className="text-lg font-bold text-[#5518C2]">
            {getBingoLetter(currentNumberDrawn)} - {currentNumberDrawn}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-6 h-24 justify-center">
          <p className="text-gray-500">Nenhum número foi sorteado</p>
        </div>
      )}

      {/* Draw button */}
      <button
        className="btn btn-primary w-full mb-6 flex items-center justify-center gap-2"
        onClick={drawNumber}
        disabled={gameStatus !== "playing"}
      >
        Sortear
        <ArrowRight size={16} />
      </button>

      {/* Previously drawn numbers */}
      <div>
        <h3 className="text-lg font-semibold text-[#5518C2] mb-2">
          Números sorteados
        </h3>

        <div className="number-board">
          {Array.from({ length: 75 }, (_, i) => i + 1).map((num) => (
            <div
              key={num}
              className={`number-board-item  ${
                drawnNumbers.includes(num)
                  ? "bg-[#B020AB] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
