import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { Award, Share2, Eye, EyeOff } from "lucide-react";

type Card = {
  id: string;
  playerName: string;
  numbers: (string | number)[][];
  markedPositions: boolean[][];
  hasWon?: boolean;
};

function encodeCard(card: Card) {
  const data = {
    playerName: card.playerName,
    numbers: card.numbers,
    markedPositions: card.markedPositions,
  };
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

export const BingoCards: React.FC = () => {
  const { cards, markCell, gameStatus } = useGame();
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const copyShareLink = (card: Card) => {
    const encoded = encodeCard(card);
    const shareUrl = `${window.location.origin}/card/${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    shareLinkSuccessMsg();
  };

  const copyAllCards = () => {
    const allCardsText =
      `[1bingo]\n\n` +
      cards
        .map((card) => {
          const encoded = encodeCard(card);
          const shareUrl = `${window.location.origin}/card/${encoded}`;
          return `Nome do jogador: ${card.playerName}\nCartela: ${shareUrl}`;
        })
        .join("\n\n");
    navigator.clipboard.writeText(allCardsText);
    shareLinkSuccessMsg();
  };

  const shareLinkSuccessMsg = () => {
    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg";
    toast.innerText = "Link copiado com sucesso!";
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const toggleExpand = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  if (cards.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">
          Nenhuma cartela criada ainda. Adicione jogadores para começar o jogo!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#5518C2]">Cartelas:</h2>
        <button
          onClick={copyAllCards}
          className="text-[#5518C2] text-sm hover:text-[#B020AB] transition-colors"
        >
          Copiar cartelas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`bg-white rounded-lg shadow-md p-4 ${
              card.hasWon ? "ring-2 ring-[#B020AB]" : ""
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#5518C2]">
                {card.playerName}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyShareLink(card)}
                  className="flex items-center gap-1 text-[#5518C2] hover:text-[#B020AB] transition-colors"
                  title="Copiar link da cartela"
                >
                  <Share2 size={18} />
                </button>
                {card.hasWon && (
                  <div className="flex items-center text-[#B020AB]">
                    <Award className="mr-1" />
                    <span className="font-semibold">BINGO!</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center mb-2">
              <button
                onClick={() => toggleExpand(card.id)}
                className="text-[#5518C2] hover:text-[#B020AB] transition-colors"
                title={
                  expandedCards.has(card.id)
                    ? "Fechar cartela"
                    : "Expandir cartela"
                }
              >
                {expandedCards.has(card.id) ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>

            {expandedCards.has(card.id) && (
              <div className="grid grid-cols-5 gap-4 justify-items-center">
                {["B", "I", "N", "G", "O"].map((letter, index) => (
                  <div
                    key={`header-${index}`}
                    className="flex items-center justify-center h-6 font-bold text-xl text-[#5518C2]"
                  >
                    {letter}
                  </div>
                ))}

                {card.numbers.map((row, rowIndex) =>
                  row.map((num, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`card-cell ${
                        card.markedPositions[rowIndex][colIndex]
                          ? "card-cell-marked"
                          : "card-cell-unmarked"
                      } ${
                        rowIndex === 2 && colIndex === 2
                          ? "bg-[#d36cce] text-white"
                          : ""
                      }`}
                      onClick={() =>
                        gameStatus === "playing" &&
                        markCell(card.id, rowIndex, colIndex)
                      }
                    >
                      {rowIndex === 2 && colIndex === 2 ? "[1bi]" : num}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
