const matches: { [key: string]: string } = {
  ['(']: ')',
  ['[']: ']',
  ['{']: '}',
  ['<']: '>'
}

export const p1 = (input: string): number => {
  const points: { [key: string]: number } = {
    [')']: 3,
    [']']: 57,
    ['}']: 1197,
    ['>']: 25137
  }
  return input.split('\n').reduce((acc, curr) => {
    const expectedChars: string[] = [];
    for (const char of curr.trim()) {
      if (!Object.keys(matches).includes(char)) {
        if ((char === expectedChars.pop())) continue;
        acc += points[char];
        break;
      } 
      expectedChars.push(matches[char]);
    }
    return acc;
  },0)
}

export const p2 = (input: string): number => {
  const points: { [key: string]: number } = {
    [')']: 1,
    [']']: 2,
    ['}']: 3,
    ['>']: 4
  }
  const pointsPerLine = input.split('\n').map(x => {
    const expectedChars: string[] = [];
    for (const char of x.trim()) {
      if (!Object.keys(matches).includes(char)) {  
        if ((char !== expectedChars.pop())) return null;
        continue;
      } 
      expectedChars.push(matches[char]);
    }
    return expectedChars.reduceRight((acc, char) => 
      (acc * 5) + points[char], 0);
  });
  const uppl = pointsPerLine
    .filter(x => x !== null)
    .map(Number)
    .sort((a, b) => a - b);
  return uppl[uppl.length / 2 | 0];
}