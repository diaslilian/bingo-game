import React, { createContext, useContext, useState, ReactNode } from "react";
import { generateBingoCard } from "../utils/bingoUtils";

type GameStatus = "setup" | "playing" | "finished";
type WinType = "row" | "column" | "full";

interface Card {
  id: string;
  playerName: string;
  numbers: (number | string)[][];
  markedPositions: boolean[][];
  hasWon: boolean;
  winType?: WinType;
  roundWon?: number;
}

interface GameContextType {
  cards: Card[];
  drawnNumbers: number[];
  gameStatus: GameStatus;
  playerCount: number;
  currentNumberDrawn: number | null;
  addCard: (playerName: string) => void;
  removeCard: (id: string) => void;
  setPlayerCount: (count: number) => void;
  drawNumber: () => void;
  resetGame: () => void;
  markCell: (cardId: string, row: number, col: number) => void;
  startGame: () => void;
  endGame: () => void;
  showRules: boolean;
  toggleRules: () => void;
  round: number;
  nextRound: () => void;
  winners: Card[];
  clearWinners: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("setup");
  const [playerCount, setPlayerCount] = useState<number>(1);
  const [currentNumberDrawn, setCurrentNumberDrawn] = useState<number | null>(
    null
  );
  const [showRules, setShowRules] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1);
  const [winners, setWinners] = useState<Card[]>([]);

  const maxRounds = 3;

  const addCard = (playerName: string) => {
    const numbers = generateBingoCard();
    const markedPositions = Array(5)
      .fill(null)
      .map(() => Array(5).fill(false));
    markedPositions[2][2] = true;
    setCards((prevCards) => [
      ...prevCards,
      {
        id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        playerName,
        numbers,
        markedPositions,
        hasWon: false,
      },
    ]);
  };

  const removeCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const generateUniqueNumber = (): number => {
    let num;
    do {
      num = Math.floor(Math.random() * 75) + 1;
    } while (drawnNumbers.includes(num));
    return num;
  };

  // Checa vitória conforme rodada
  const checkWinningCondition = (
    marked: boolean[][],
    round: number
  ): WinType | null => {
    // Rodada 3: cartela cheia
    if (round === 3) {
      if (marked.flat().every(Boolean)) return "full";
      return null;
    }
    // Rodadas 1 e 2: linha/coluna (sem centro)
    // Linha
    for (let row = 0; row < 5; row++) {
      if (row === 2) continue;
      if (marked[row].every((cell) => cell)) return "row";
    }
    // Coluna
    for (let col = 0; col < 5; col++) {
      if (col === 2) continue;
      if (marked.every((row) => row[col])) return "column";
    }
    // Não permite diagonal
    return null;
  };

  // Sorteia número e marca cartelas, detecta vencedores da rodada
  const drawNumber = () => {
    if (drawnNumbers.length >= 75) return;
    const newNumber = generateUniqueNumber();
    const newDrawnNumbers = [...drawnNumbers, newNumber];
    setDrawnNumbers(newDrawnNumbers);
    setCurrentNumberDrawn(newNumber);

    const updatedCards = cards.map((card) => {
      if (card.hasWon) return card;
      const newMarked = card.markedPositions.map((row) => [...row]);
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (card.numbers[row][col] === newNumber) {
            newMarked[row][col] = true;
          }
        }
      }
      const winType = checkWinningCondition(newMarked, round);
      const hasWon = !!winType;
      return {
        ...card,
        markedPositions: newMarked,
        hasWon,
        winType: hasWon ? winType : undefined,
        roundWon: hasWon ? round : undefined,
      };
    });

    // Novos vencedores da rodada
    const newWinners = updatedCards.filter(
      (card, idx) =>
        card.hasWon && !cards[idx].hasWon && card.roundWon === round
    );
    if (newWinners.length > 0) {
      setWinners(newWinners);
      setGameStatus("finished");
    }
    setCards(updatedCards);
  };

  // Avança para próxima rodada
  const nextRound = () => {
    if (round < maxRounds) {
      setRound(round + 1);
      setWinners([]);
      setGameStatus("playing");
    }
  };

  const clearWinners = () => setWinners([]);

  const markCell = (cardId: string, row: number, col: number) => {
    if (gameStatus !== "playing") return;
    setCards(
      cards.map((card) => {
        if (card.id === cardId) {
          const newMarked = card.markedPositions.map((r) => [...r]);
          newMarked[row][col] = !newMarked[row][col];
          const winType = checkWinningCondition(newMarked, round);
          const hasWon = !!winType;
          return {
            ...card,
            markedPositions: newMarked,
            hasWon,
            winType: hasWon ? winType : undefined,
            roundWon: hasWon ? round : undefined,
          };
        }
        return card;
      })
    );
  };

  const resetGame = () => {
    setCards([]);
    setDrawnNumbers([]);
    setGameStatus("setup");
    setCurrentNumberDrawn(null);
    setRound(1);
    setWinners([]);
  };

  const startGame = () => {
    setGameStatus("playing");
  };

  const endGame = () => {
    setGameStatus("finished");
  };

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  const value = {
    cards,
    drawnNumbers,
    gameStatus,
    playerCount,
    currentNumberDrawn,
    addCard,
    removeCard,
    setPlayerCount: (count: number) => setPlayerCount(count),
    drawNumber,
    resetGame,
    markCell,
    startGame,
    endGame,
    showRules,
    toggleRules,
    round,
    nextRound,
    winners,
    clearWinners,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
