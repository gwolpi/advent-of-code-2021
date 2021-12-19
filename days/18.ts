const processLine = (line: string): string => {
  const explode = () => {
    let depth = 0;
    return line.split('').reduce((acc: boolean, currChar: string, i: number) => {
      if (acc) return true;
      if (currChar == '[') depth++;
      if (currChar == ']') depth--;
      if (depth < 5) return acc;
      let [,l,x,y,r] = new RegExp(`^(.{${i},}?)\\[(\\d+),(\\d+)\\](.+)$`, 'g').exec(line)!;
      const lastMatch = l.match(/(.+)(\d+)(?!.*\d+)(.+)/);
      if (lastMatch) {
        const [, start, match, end] = lastMatch;
        l = `${start}${+match + +x}${end}`;
      }
      const firstMatch = r.match(/(.+?)(\d+)(.+)/);
      if (firstMatch) {
        const [, start, match, end] = firstMatch
        r = `${start}${+match + +y}${end}`;
      }
      line = `${l}0${r}`;
      return true;
    }, false);
  }

  const split = (): boolean => {
    const splitMatch = line.match(/(.+?)(\d{2,})(.+)/);
    if (splitMatch) {
      const [, start, match, end] = splitMatch;
      const curr = Number(match);
      line = `${start}[${Math.floor(curr / 2)},${Math.ceil(curr / 2)}]${end}`;
    }
    return !!splitMatch;
  }

  while (explode() || split());
  return line;
}

const magnitude = (a: string): number => {
  const recurse = (data: number | number[]): number => 
    typeof data == 'number' ? data : recurse(data[0]) * 3 + recurse(data[1]) * 2;
  return recurse(JSON.parse(a));
}

export const p1 = (input: string ) => {
  const numbers = input.trim().split('\n');
  return magnitude(numbers.reduce((a, b) => processLine(`[${a},${b}]`)));
}

export const p2 = (input: string ) => {
  const numbers = input.trim().split('\n');
  const maxs = numbers.reduce((agg, _, a) => [
    ...agg,
    ...numbers.map((_, b) => magnitude(processLine(`[${numbers[a]},${numbers[b]}]`)))
  ], [] as number[]);
  return Math.max(...maxs);
}