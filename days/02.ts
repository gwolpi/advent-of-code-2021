export const p1 = (input: string): number => {
  const sub: { [key: string]: number } = { x: 0, y: 0 };
  const dirs: { [key: string]: { x?: number, y?: number }} = {
    ['forward']: { x: 1 },
    ['down']: { y: 1 },
    ['up']: { y: -1 }
  };
  [...input.matchAll(/(\w+)\s(\d+)/g)].forEach(([, action, amount]) => {
    const subDir: { [key: string]: number } = dirs[action]
    Object.keys(subDir).forEach((dir) => sub[dir] = Math.max(sub[dir] + subDir[dir] * +amount, 0));
  });
  return sub.x * sub.y;
}

export const p2 = (input: string): number => {
  const sub: { [key: string]: number } = { x: 0, y: 0, a: 0 };
  const dirs: { [key: string]: { x?: number, a?: number }} = {
    ['forward']: { x: 1 },
    ['down']: { a: 1 },
    ['up']: { a: -1 }
  };
  [...input.matchAll(/(\w+)\s(\d+)/g)].forEach(([, action, amount]) => {  
    const subDir: { [key: string]: number } = dirs[action];
    Object.keys(subDir).forEach((dir) => sub[dir] = Math.max(sub[dir] + subDir[dir] * +amount, 0));
    if (subDir.x) sub.y += +amount * sub.a;
  });
  return sub.x * sub.y;
}