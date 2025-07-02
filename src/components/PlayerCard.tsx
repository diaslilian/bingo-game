import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface PlayerCardData {
  playerName: string;
  numbers: number[][];
  markedPositions?: boolean[][];
}

function decodeCard(encoded: string): PlayerCardData | null {
  try {
    const decoded = decodeURIComponent(atob(encoded));
    return JSON.parse(decoded) as PlayerCardData;
  } catch {
    return null;
  }
}

export const PlayerCard: React.FC = () => {
  const { cardId } = useParams();

  const initialCard = cardId ? decodeCard(cardId) : null;
  const [markedPositions, setMarkedPositions] = useState(
    initialCard?.markedPositions ||
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(false))
  );

  if (!initialCard) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">
          Cartela não encontrada ou link inválido.
        </p>
      </div>
    );
  }

  const handleMark = (rowIdx: number, colIdx: number) => {
    // Não permite marcar o centro
    if (rowIdx === 2 && colIdx === 2) return;
    setMarkedPositions((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[rowIdx][colIdx] = !copy[rowIdx][colIdx];
      return copy;
    });
  };

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#5518C2]">
            {initialCard.playerName}
          </h2>
        </div>
        <div className="grid grid-cols-5 gap-4 justify-items-center">
          {["B", "I", "N", "G", "O"].map((letter, index) => (
            <div
              key={`header-${index}`}
              className="flex items-center justify-center h-10 font-bold text-xl text-[#5518C2]"
            >
              {letter}
            </div>
          ))}
          {initialCard.numbers.map((row, rowIndex) =>
            row.map((num, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`card-cell ${
                  (rowIndex === 2 && colIndex === 2) ||
                  markedPositions[rowIndex][colIndex]
                    ? "card-cell-marked"
                    : "card-cell-unmarked"
                } ${
                  rowIndex === 2 && colIndex === 2
                    ? "bg-[#d36cce] text-white"
                    : ""
                }`}
                onClick={() => handleMark(rowIndex, colIndex)}
                style={{
                  cursor:
                    rowIndex === 2 && colIndex === 2
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {rowIndex === 2 && colIndex === 2 ? "[1bi]" : num}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
