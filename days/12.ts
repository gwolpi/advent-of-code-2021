type CaveMap = { [key: string]: string[] };

const createMapFromConnections = (input: string): CaveMap => {
  const map: CaveMap = {};
  const connect = (connStart: string, connEnd: string) => {
    const caveStart = map[connStart] ||= [];
    const caveEnd = map[connEnd] ||= [];
    if (connEnd !== 'start') caveStart.push(connEnd);
    if (connStart !== 'start') caveEnd.push(connStart);
  };
  [...input.matchAll(/(start|end|[A-Z]{2}|[a-z]{2})-(start|end|[A-Z]{2}|[a-z]{2})/g)]
    .forEach(([, connStart, connEnd]) => connect(connStart, connEnd));
  return map;
};

const getPossibilities = (map: CaveMap, allowSecondVisit: boolean = false): number => {
  let possibilities = 0;
  const traverseCaves = (caveName = 'start', visited = new Array<string>(), revisited: boolean = !allowSecondVisit) => {
    if (caveName === 'end') {
      possibilities++;
      return;
    }
    if (caveName.match(/[a-z]{2}/)) {
      if (visited.includes(caveName)) revisited = true;
      visited = [...visited, caveName];
    };
    map[caveName]
      .filter(cave => !revisited || !visited.includes(cave))
      .forEach(cave => traverseCaves(cave, visited, revisited));
  };
  traverseCaves();
  return possibilities;
}

export const p1 = (input: string): number => getPossibilities(createMapFromConnections(input));

export const p2 = (input: string): number => getPossibilities(createMapFromConnections(input), true);
