type DotMatrix = { [key: number]: { [key: number]: boolean } };
type Fold = { axis: string; pos: number };

const processInput = (input: string): [DotMatrix, Fold[]] => {
  const [dotMatrixInput, foldsInput] = input.split('\n\n');
  const dotMatrix = dotMatrixInput
    .split("\n")
    .map(line => line.split(",").map(Number))
    .reduce((acc, [x, y]) => {
      (acc[y] ||= {})[x] = true;
      return acc;
    }, {} as DotMatrix);
  const folds: Fold[] = [...foldsInput.matchAll(/fold along ([xy])=(\d+)/g)].map(([, axis, pos]) => ({ axis, pos: +pos }));
  return [dotMatrix, folds];
}

const fold = (matrix: DotMatrix, { axis, pos }: Fold): void => {
  switch (axis) {
    case 'x': {
      for (const y in matrix)
        for (const x in matrix[y])
          if (+x > pos) {
            (matrix[y] ||= {})[2 * pos - +x] = true;
            delete matrix[y][x];
          }
      return;
    }
    case 'y': {
      for (const y in matrix)
        if (+y >= pos) {
          Object.assign((matrix[2 * pos - +y] ||= {}), matrix[y]);
          delete matrix[y];
        }
      return;
    }
  }
}

export const p1 = (input: string): number => {
  const [dotMatrix, folds] = processInput(input);
  fold(dotMatrix, folds[0]);
  return Object.values(dotMatrix).flatMap(y => Object.values(y)).length;
}

export const p2 = (input: string): string => {
  const [dotMatrix, folds] = processInput(input);
  folds.forEach((x: Fold) => fold(dotMatrix, x));
  const ys: number[] = Object.keys(dotMatrix).map(Number).filter(y => dotMatrix[y] && Object.keys(dotMatrix[y]).length);
  const xs: number[] = Object.values(dotMatrix).reduce((acc, row) => ([...acc, ...Object.keys(row).map(Number)]), [] as number[]);

  let result = "";
  for (let y = Math.min(...ys); y <= Math.max(...ys); y++) {
    result += "\n";
    for (let x = Math.min(...xs); x <= Math.max(...xs); x++) {
      if (y in dotMatrix && x in dotMatrix[y]) {
        result += "🟥";
      } else {
        result += "⬜";
      }
    }
  }
  return result;
}