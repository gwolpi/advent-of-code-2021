type BingoCard = BingoCardField[][];
type BingoCardField = (number | 'X')

const extractInput = (lines: string[]): [number[], BingoCard[]] => {
  const numbersDrawn = lines.splice(0, 1)[0].split(',').map(Number);
  const bingoCards = lines.map(card => card.split('\n').map(x => x.trim().split(/\s+/).map(Number))) as BingoCard[];
  return [numbersDrawn, bingoCards];
};

const drawNumber = (numberDrawn: number, cards: BingoCard[]): void => {
  cards.forEach((card: BingoCard) => {
    card.forEach((row: BingoCardField[]) => {
      row.forEach((_: BingoCardField, index: number) => {
        if (row[index] === numberDrawn) {
          row[index] = 'X';
        }
      });
    });
  });
};

const findCurrentWinners = (cards: BingoCard[]): BingoCard[] => {
  return cards.filter((card: BingoCard) => {
    const horizontalWin = card.some(row => row.every(num => num === 'X'));
    const verticalWin = card.some((_, i) => card.every(row => row[i] === 'X'));
    return horizontalWin || verticalWin;
  })
}

const accumulateNumbers = (card: BingoCard): number => {
  const remainingNumbers = card.flat().filter(num => typeof num === 'number').map(num => num as number);
  return remainingNumbers.reduce((acc, next) => acc + next, 0);
};

export const p1 = (input: string): number | undefined  => {
  const [numbersDrawn, bingoCards] = extractInput(input.split('\n\n'));
  for (const numberDrawn of numbersDrawn) {
    drawNumber(numberDrawn, bingoCards);
    const winners = findCurrentWinners(bingoCards);
    if (winners.length) return accumulateNumbers(winners[0]) * numberDrawn;
  }
}

export const p2 = (input: string): number | undefined => {
  let [numbersDrawn, bingoCards] = extractInput(input.split('\n\n'));
  for (const numberDrawn of numbersDrawn) {
    drawNumber(numberDrawn, bingoCards);
    const winners = findCurrentWinners(bingoCards);
    if (winners.length) {
      bingoCards = bingoCards.filter(card => !winners.includes(card))
      if (!bingoCards.length) return accumulateNumbers(winners[0]) * numberDrawn;
    }
  }
}