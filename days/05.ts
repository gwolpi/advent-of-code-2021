type CoordinateSets = [Set<string>, Set<string>];

const extractInput = (input: string) =>  
  [...input.matchAll(/(\d+),(\d+) -> (\d+),(\d+)/g)]
    .map(x => x.map(Number))
    .map(([, x1, y1, x2, y2]) => ({ x1, y1, x2, y2}));
const assignCoordinateToSet = ([single, multiple]: CoordinateSets, x: number, y: number) => {
  const xy = `x${x}y${y}`;
  single.has(xy) ? multiple.add(xy) : single.add(xy);
};

export const p1 = (input: string): number => {
  const sets: CoordinateSets = [ new Set(), new Set() ];
  for(const { x1, y1, x2, y2 } of extractInput(input)) {
    if (x1 === x2) {
      const [start, end] = y1 > y2 ? [y2, y1] : [y1, y2];
      for (let y = start; y <= end; y++) assignCoordinateToSet(sets, x1, y);
    }
    if (y1 === y2) {
      const [start, end] = x1 > x2 ? [x2, x1] : [x1, x2];
      for (let x = start; x <= end; x++) assignCoordinateToSet(sets, x, y1);
    }
  }
  const [, multiple] = sets;
  return multiple.size;
}

export const p2 = (input: string): number => {
  const sets: CoordinateSets = [ new Set(), new Set() ];
  for (const {x1, y1, x2, y2} of extractInput(input)) {
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);
    for (let d = 0; d <= Math.abs(x1 === x2 ? y2 - y1 : x2 - x1); d++) {
      const [x, y] = [x1 + d * dx, y1 + d * dy];
      assignCoordinateToSet(sets, x, y);
    }
  }
  const [, multiple] = sets;
  return multiple.size;
}
