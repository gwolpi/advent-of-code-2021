type PointsMap = { [key: string]: number };
const matchingBrackets = /\(\)|\[\]|\{\}|\<\>/g;
const corruptedLine = /([\)\]\}\>])/;

export const p1 = (input: string): number | undefined => {
  const points: PointsMap = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
  return input.split('\n').reduce((score, line) => {
    while(line.length !== (line = line.replaceAll(matchingBrackets, '').trim()).length);
    const isCorrupted = line.match(corruptedLine);
    return score += isCorrupted ? points[isCorrupted.pop()!] : 0;
  }, 0) 
}

export const p2 = (input: string): number | undefined => {
  const points: PointsMap = { '(': 1, '[': 2, '{': 3, '<': 4 };
  const result = input.split('\n').reduce((total, line) => {
    while(line.length !== (line = line.replaceAll(matchingBrackets, '').trim()).length);
    if (!line.match(corruptedLine)) 
      total.push(line.split('').reduceRight((acc, char) => (acc * 5) + points[char], 0));
    return total;
  }, [] as number[]);
  return result.sort((a, b) => a - b)[result.length / 2 | 0];
}
