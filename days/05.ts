type Diagram = { [key: string]: { [key: string]: number }};

const extractInput = (input: string) =>  
  [...input.matchAll(/(\d+),(\d+) -> (\d+),(\d+)/g)]
    .map(x => x.map(Number))
    .map(([, x1, y1, x2, y2]) => ({ x1, y1, x2, y2}));
const iterateDiagramCoordinate = (diagram: Diagram, x: number, y: number) => {
  ((diagram[y] ||= { [x]: 0 })[x] ||= 0);
  diagram[y][x]++;
}

export const p1 = (input: string): number => {
  const diagram: Diagram = {};
  for(const { x1, y1, x2, y2 } of extractInput(input)) {
    if (x1 === x2) {
      const [start, end] = y1 > y2 ? [y2, y1] : [y1, y2];
      for (let y = start; y <= end; y++) iterateDiagramCoordinate(diagram, x1, y);
    }
    if (y1 === y2) {
      const [start, end] = x1 > x2 ? [x2, x1] : [x1, x2];
      for (let x = start; x <= end; x++) iterateDiagramCoordinate(diagram, x, y1);
    }
  }
  const cells = Object.values(diagram).flatMap(x => Object.values(x));
  return cells.filter(x => x >= 2).length;
}

export const p2 = (input: string): number => {
  const diagram: Diagram = {};
  for (const {x1, y1, x2, y2} of extractInput(input)) {
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);
    for (let d = 0; d <= Math.abs(x1 === x2 ? y2 - y1 : x2 - x1); d++) {
      const [x, y] = [x1 + d * dx, y1 + d * dy];
      iterateDiagramCoordinate(diagram, x, y);
    }
  }
  const cells = Object.values(diagram).flatMap(x => Object.values(x));
  return cells.filter(x => x >= 2).length;
}
