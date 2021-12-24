type Matrix3D = { [key: string]: { [key: string]: { [key: string]: boolean } }} ;
type Step = { state: boolean, minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number };

const processInput = (input: string): Step[] => 
   [...input.matchAll(/(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/g)]
    .map((line: RegExpMatchArray)=> {
      const [ ,stateString, ...coordsString ] = line;
      const state = stateString === 'on';
      const [ minX, maxX, minY, maxY, minZ, maxZ ] = coordsString.map(Number);
      return { state, minX, maxX, minY, maxY, minZ, maxZ };
    });

export const p1 = (input: string): number => {
  const matrix = processInput(input)
    .filter((line) => {
      const [ , ...coords ] = Object.values(line).map(Number);
      return !coords.some(x => x > 50 || x < -50);
    })
    .reduce((acc, { state, minX, maxX, minY, maxY, minZ, maxZ }) => {
      for(let z = minZ; z <= maxZ; z++)  
        for(let y = minY; y <= maxY; y++)
          for(let x = minX; x <= maxX; x++) 
            ((acc[z] ||= {})[y] ||= {})[x] = state;
      return acc
    }, {} as Matrix3D)
  return Object.values(matrix)
    .flatMap(grid => Object.values(grid))
    .map(row => Object.values(row).filter(Boolean).length)
    .reduce((acc, curr) => acc + curr, 0);
}

export const p2 = (input: string): number => {
  const axesCross = (a: any, b: any, axis: 'X'|'Y'|'Z'): boolean => {
    const min = `min${axis}`;
    const max = `max${axis}`;
    return (a[min] <= b[min] && a[max] >= b[min]) 
      || (a[min] >= b[min] && a[max] <= b[max]) 
      || (b[min] <= a[min] && b[max] >= a[min]) 
      || (b[min] >= a[min] && b[max] <= a[max])
  };

  const valuesCross = (a: Partial<Step>, b: Partial<Step>): boolean =>
    axesCross(a, b, 'X') && axesCross(a, b, 'Y') && axesCross(a, b, 'Z');

  const reduceSteps = (a: any, b: any, axis: 'X'|'Y'|'Z') => {
    const min = `min${axis}`;
    const max = `max${axis}`;
    const minBinA = b[min] >= a[min] && b[min] <= a[max];
    const maxBinA = b[max] >= a[min] && b[max] <= a[max];
    const eligableSteps = [];

    if (minBinA && maxBinA) {
      eligableSteps.push([a[min], b[min] - 1], [b[min], b[max]], [b[max] + 1, a[max]]);
    } else if (maxBinA) {
      eligableSteps.push([a[min], b[max]], [b[max] + 1, a[max]]);
    } else if (minBinA) {
      eligableSteps.push([a[min], b[min] - 1], [b[min], a[max]]);
    } else {
      eligableSteps.push([a[min], a[max]]);
    }

    return eligableSteps.filter(([min, max]) => min <= max);
  };

  const splitIntoParts = (a:Step, b: Step) => {
    if (!valuesCross(a, b)) return [a];
    const steps: Step[] = [];
    for (const [minX, maxX] of reduceSteps(a, b, "X")) {
      for (const [minY, maxY] of reduceSteps(a, b, "Y")) {
        for (const [minZ, maxZ] of reduceSteps(a, b, "Z")) {
          const step: Partial<Step> = {minX, maxX, minY, maxY, minZ, maxZ};
          step.state = valuesCross(b, step) ? b.state : a.state;
          steps.push(step as Step);
        }
      }
    }
    return steps;
  };

  return processInput(input)
    .reduce(
      (acc, group) => acc.flatMap(group => splitIntoParts(group, group)),
      [{minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity, minZ: -Infinity, maxZ: Infinity, state: false}],
    )
    .filter(({ state }) => state)
    .map(({minX, maxX, minY, maxY, minZ, maxZ}) => (maxX - minX + 1) * (maxY - minY + 1) * (maxZ - minZ + 1))
    .reduce((acc, n) => acc + n, 0);
}

