type BingoCard = BingoCardField[][];
type BingoCardField = (number | 'X');

const extractInput = (input: string): [number[], BingoCard[]] => {
  const [inputNumbers, ...inputCards] = input.split('\n\n');
  const numbersDrawn = inputNumbers.split(',').map(Number);
  const bingoCards = inputCards.map(card => card.split('\n').map(x => x.trim().split(/\s+/).map(Number))) as BingoCard[];
  return [numbersDrawn, bingoCards];
};

const drawNumber = (numberDrawn: number, cards: BingoCard[]): void => {
  cards.forEach((card: BingoCard) =>
    card.find((row: BingoCardField[]) =>
      row.find((_: BingoCardField, index: number) =>
        ((row[index] === numberDrawn) && (row[index] = 'X'))
      )
    )
  );
};

const findCurrentWinners = (cards: BingoCard[]): BingoCard[] => {
  return cards.filter((card: BingoCard): boolean => {
    const horizontalWin = card.some((row => row.every(num => num === 'X')));
    const verticalWin = card.some((_, index) => card.every(row => row[index] === 'X'));
    return horizontalWin || verticalWin;
  })
}

const accumulateNumbers = (card: BingoCard): number => {
  const remainingNumbers = card.flat().filter(num => (typeof num === 'number')).map(Number);
  return remainingNumbers.reduce((acc, next) => acc + next, 0);
};

export const p1 = (input: string): number | undefined  => {
  const [numbersDrawn, bingoCards] = extractInput(input);
  for (const numberDrawn of numbersDrawn) {
    drawNumber(numberDrawn, bingoCards);
    const [winner] = findCurrentWinners(bingoCards);
    if (winner) return accumulateNumbers(winner) * numberDrawn;
  }
}

export const p2 = (input: string): number | undefined => {
  let [numbersDrawn, bingoCards] = extractInput(input);
  for (const numberDrawn of numbersDrawn) {
    drawNumber(numberDrawn, bingoCards);
    const winners = findCurrentWinners(bingoCards);
    if (winners.length) {
      bingoCards = bingoCards.filter(card => !winners.includes(card))
      const [winner] = winners;
      if (!bingoCards.length) return accumulateNumbers(winner) * numberDrawn;
    }
  }
}
