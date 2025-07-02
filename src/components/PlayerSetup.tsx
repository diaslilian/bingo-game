import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { Users, UserPlus, PlayCircle } from "lucide-react";
import { DEFAULT_PLAYERS } from "../utils/oneBiers";

export const PlayerSetup: React.FC = () => {
  const { addCard, cards, startGame } = useGame();
  const [playerName, setPlayerName] = useState<string>("");

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      addCard(playerName.trim());
      setPlayerName("");
    }
  };

  const { removeCard: removeCardFromContext } = useGame();

  const removeCard = (id: string) => {
    removeCardFromContext(id);
  };

  const addDefaultPlayers = () => {
    DEFAULT_PLAYERS.forEach((name) => addCard(name));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Users size={26} className="text-black" />
        <h2 className="text-2xl font-semibold">Adicionar jogadores</h2>
      </div>

      <form onSubmit={handleAddPlayer} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Adicionar nome do jogador"
            autoFocus
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B020AB] focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <UserPlus size={16} />
            Adicionar
          </button>
          <button
            type="button"
            onClick={addDefaultPlayers}
            className="btn btn-secondary flex items-center justify-center gap-2"
          >
            1biers
          </button>
        </div>
      </form>

      {cards.length > 0 && (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#5518C2] mb-2">
              Jogadores adicionados:
            </h3>
            <div className="flex flex-wrap gap-2">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="relative group bg-[#f3e8f3] text-[#B020AB] px-3 py-1 rounded-full text-base font-medium flex items-center gap-2"
                >
                  {card.playerName}
                  <button
                    type="button"
                    aria-label={`Remover ${card.playerName}`}
                    onClick={() => removeCard(card.id)}
                    className="text-[#B020AB] hover:text-red-500 text-base font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            disabled={cards.length === 0}
            className="btn btn-secondary w-full flex items-center justify-center gap-2"
          >
            <PlayCircle size={20} />
            Iniciar ({cards.length} jogadores)
          </button>
        </>
      )}

      {cards.length === 0 && (
        <div className="text-center text-gray-500 my-4">
          <p>Nenhum jogador adicionado ainda.</p>
          <p>Adicione jogadores para começar o jogo!</p>
        </div>
      )}
    </div>
  );
};
