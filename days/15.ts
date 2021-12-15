type Position = { risk: number, totalRiskForRoute: number };
type Cave = Position[][];

const processInput = (input: string, caveMultiplier = 1): Cave => {
  return input
    .split("\n")
    .reduce((acc: Cave[], line: string) => {
      const newLine = (index: number): Position[] => line.split('').map(risk => 
        ({ risk: ((Number(risk) + index - 1) % 9) + 1, totalRiskForRoute: Infinity } as Position));
      const newBlock = (index: number): Position[] => 
        acc.reduce((block, _, i) => [...block, ...newLine(i + index)], [] as Position[]);
      acc.forEach((accBlock, i) => accBlock.push(newBlock(i)));
      return acc;
    }, Array.from({length: caveMultiplier}, () => ([])) as Cave[])
    .flat()
    .filter((lines: Position[]) => lines.length);
}

const findLowestRisk = (cave: Cave) => {
  cave[0][0].totalRiskForRoute = 0;
  const neighbours = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let curr = [[0, 0]]; curr.length > 0;) {
    const next = [];
    for (const [x, y] of curr) {
      for (const [dx, dy] of neighbours) {
        if (typeof (cave[y + dy]?.[x + dx]) === 'undefined') continue;
        const prevRisk = cave[y + dy][x + dx].totalRiskForRoute;
        const currRisk = cave[y][x].totalRiskForRoute + cave[y + dy][x + dx].risk;
        if (currRisk < prevRisk) {
          cave[y + dy][x + dx].totalRiskForRoute = currRisk;
          next.push([x + dx, y + dy]);
        }
      }
    }
    curr = next;
  }
  return cave.at(-1)?.at(-1)?.totalRiskForRoute!;
}

export const p1 = (input: string): number => findLowestRisk(processInput(input));

export const p2 = (input: string): number => findLowestRisk(processInput(input, 5));