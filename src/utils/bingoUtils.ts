// Generate a random number between min and max (inclusive)
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a unique set of numbers for a column
export const generateUniqueNumbers = (
  count: number,
  min: number,
  max: number
): number[] => {
  const numbers: number[] = [];

  while (numbers.length < count) {
    const num = getRandomNumber(min, max);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers;
};

// Generate a complete bingo card with 5x5 grid
export const generateBingoCard = (): (number | string)[][] => {
  // Generate numbers for each column in the BINGO card
  const bColumn = generateUniqueNumbers(5, 1, 15);
  const iColumn = generateUniqueNumbers(5, 16, 30);
  const nColumn = generateUniqueNumbers(5, 31, 45);
  const gColumn = generateUniqueNumbers(5, 46, 60);
  const oColumn = generateUniqueNumbers(5, 61, 75);

  // Create the 5x5 grid
  const card: (number | string)[][] = [
    [bColumn[0], iColumn[0], nColumn[0], gColumn[0], oColumn[0]],
    [bColumn[1], iColumn[1], nColumn[1], gColumn[1], oColumn[1]],
    [bColumn[2], iColumn[2], "FREE", gColumn[2], oColumn[2]],
    [bColumn[3], iColumn[3], nColumn[3], gColumn[3], oColumn[3]],
    [bColumn[4], iColumn[4], nColumn[4], gColumn[4], oColumn[4]],
  ];

  return card;
};

// Format a bingo number with its letter prefix (B-15, I-22, etc.)
export const formatBingoNumber = (number: number): string => {
  if (number <= 15) return `B-${number}`;
  if (number <= 30) return `I-${number}`;
  if (number <= 45) return `N-${number}`;
  if (number <= 60) return `G-${number}`;
  return `O-${number}`;
};

// Check if a given card has a winning pattern
export const checkWinningPatterns = (markedPositions: boolean[][]): boolean => {
  // Check rows
  for (let row = 0; row < 5; row++) {
    if (markedPositions[row].every((cell) => cell)) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    if (markedPositions.every((row) => row[col])) {
      return true;
    }
  }

  // Check diagonals
  if (
    markedPositions[0][0] &&
    markedPositions[1][1] &&
    markedPositions[2][2] &&
    markedPositions[3][3] &&
    markedPositions[4][4]
  ) {
    return true;
  }

  if (
    markedPositions[0][4] &&
    markedPositions[1][3] &&
    markedPositions[2][2] &&
    markedPositions[3][1] &&
    markedPositions[4][0]
  ) {
    return true;
  }

  return false;
};
