type PairMap = { [ key:string ]: number }

const processInput = (input: string, steps = 10): number => {
  const [templateInput, rulesInput] = input.split('\n\n');
  const template = templateInput.split('');
  const rules = [...rulesInput.matchAll(/([A-Z]{2}) -> ([A-Z]{1})/g)].reduce((acc, [, from, to]) => {
    acc[from] = to;
    return acc;
  }, {} as { [key: string]: string });
  const increment = (map: PairMap, key: string, value = 1) => {
    (map[key] ||= 0);
    map[key] += value;
  };
  let pairMap: PairMap = {};
  template.forEach((_: string, i: number) => {
    increment(pairMap, `${template[i]}${template[i + 1]}`)
  });
  for (let step = 0; step < steps; step++) {
    const nextPairMap: PairMap = {};
    Object.entries(pairMap).forEach(([ [i, j], count ]) => {
      const x = rules[`${i}${j}`];
      increment(nextPairMap, `${i}${x}`, count);
      increment(nextPairMap, `${x}${j}`, count);
    });
    pairMap = nextPairMap;
  }
  const elementsCounter = Object.entries(pairMap)
    .reduce((acc, [key, count]) => {
      const [pairOne, pairTwo] = key.split('');
      increment(acc, pairOne, count);
      return acc;
    }, { [`${template.at(-1)}`]: 0} as { [key: string]: number });
  const elementCounts: number[] = Object.values(elementsCounter);
  return Math.max(...elementCounts) - Math.min(...elementCounts);
}

export const p1 = (input: string): number => processInput(input);

export const p2 = (input: string): number => processInput(input, 40);
