const regex = /\(\)|\[\]|\{\}|\<\>/g;

export const p1 = (input: string): number | undefined => {
  const points: { [key: string]: number } = {
    ')': 3, ']': 57, '}': 1197, '>': 25137
  };
  return input.split('\n').reduce((total, line) => {
    while(line.length !== (line = line.replaceAll(regex, '').trim()).length);
    const match = line.match(/([\)\]\}\>])/);
    if (match) total += points[match[1]];
    return total;
  }, 0) 
}

export const p2 = (input: string): number | undefined => {
  const points: { [key: string]: number } = {
    '(': 1, '[': 2, '{': 3, '<': 4
  };
  const result = input.split('\n').reduce((total, line) => {
    while(line.length !== (line = line.replaceAll(regex, '').trim()).length);
    if (line.match(/([\)\]\}\>])/)) return total;
    return [
      ...total,  
      line.split('').reduceRight((acc, char) => 
        (acc * 5) + points[char], 0)
    ];
  }, [] as number[]) 
    .sort((a, b) => a - b);
  return result[result.length / 2 | 0];
}
