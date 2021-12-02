const dirs: { [key: string]: { x?: 1 | -1, dy?: 1 | -1 }} = {
  ['forward']: { x: 1 },
  ['down']: { dy: 1 },
  ['up']: { dy: -1 }
};

export const p1 = (input: string): number => {
  const sub: { [key: string]: number } = { x: 0, dy: 0, y: 0 };
  [...input.matchAll(/(\w+)\s(\d+)/g)].forEach(([, action, amount]) => {
    const subDir: { [key: string]: 1 | -1 } = dirs[action]
    Object.keys(subDir).forEach((dir) => sub[dir] += subDir[dir] * +amount);
  });
  return sub.x * sub.dy;
}

export const p2 = (input: string): number => {
  const sub: { [key: string]: number } = { x: 0, dy: 0, y: 0 };
  [...input.matchAll(/(\w+)\s(\d+)/g)].forEach(([, action, amount]) => {  
    const subDir: { [key: string]: 1 | -1 } = dirs[action];
    Object.keys(subDir).forEach((dir) => sub[dir] += subDir[dir] * +amount);
    if (subDir.x) sub.y += +amount * sub.dy;
  });
  return sub.x * sub.y;
}
