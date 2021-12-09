type GridItem = { basinId: number, height: number, x: number, y: number };
type Grid = { [key: string]: { [key: string] : GridItem }};

class Heightmap {
  grid: Grid;
 
  get points(): GridItem[] {
    return Object.values(this.grid).flatMap(y => Object.values(y));
  }

  constructor(input: string, addCondition: (height: number) => boolean = () => true) {
    this.grid = {};
    input
    .split("\n")
    .map(line => line.split("").map(Number))
    .forEach((row, y) => row.forEach((height, x) => {
      if (addCondition(height)) this.set({x, y, basinId: 0, height});
    }));
  }

  *[Symbol.iterator]() {
    for (const y in this.grid) {
      for (const x in this.grid[y]) {
        yield this.grid[y][x];
      }
    }
  }

  set({x, y, height, basinId}: GridItem): void {
    const point = ((this.grid[y] ||= {})[x] ||= { x, y, height: 0, basinId: 0 });
    point.height = height
    point.basinId = basinId;
  }

  getNeighboursFor(x: number, y: number): GridItem[] {
    return [
      this.grid[y+1]?.[x],
      this.grid[y][x+1],
      this.grid[y-1]?.[x],
      this.grid[y][x-1],
    ].filter(point => point !== undefined);
  }
}

export const p1 = (input: string): number => {
  const heightmap = new Heightmap(input);
  return [...heightmap]
    .reduce((acc, { x, y, height }) => 
      heightmap.getNeighboursFor(x, y)
        .every(({height: neighbourHeight}) => neighbourHeight > height) 
          ? [...acc, height + 1] : acc, [] as number[])
    .reduce((a, b) => a + b)
}

export const p2 = (input: string): number => {
  const heightmap = new Heightmap(input, (x) => x < 9);
  let nextBasinId = 0;
  for (const {x, y, height} of heightmap) {
    const neighbourBasinIds = heightmap.getNeighboursFor(x, y)
      .map(({basinId}) => basinId)
      .filter(basinId => basinId !== 0)
      .filter((basinId, i, arr) => arr.indexOf(basinId) === i);
    const basinId = neighbourBasinIds.pop() || ++nextBasinId;
    heightmap.set({x, y, basinId, height});
    for (const neighbourBasinId of neighbourBasinIds) {
      for (const {x, y, basinId: basin, height} of heightmap) {
        if (basin === neighbourBasinId) heightmap.set({x, y, basinId, height});
      }
    }
  }
  return Object.values(heightmap.points
      .map(({basinId}) => basinId!)
      .reduce((acc, value) => {
        acc[value] = acc[value] || 0;
        acc[value]++;
        return acc;
      }, {} as { [key: number]: number})
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b);
}