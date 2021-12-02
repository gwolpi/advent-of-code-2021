export const p1 = (input: string): number => {
  const sub: { [key: string]: number } = { x: 0, y: 0 };
  [...input.matchAll(/(\w+)\s(\d+)/g)].forEach(([, action, amount]) => {
    const dirs: { [key: string]: { x?: number, y?: number }} = {
      ['forward']: { x: +amount },
      ['down']: { y: +amount },
      ['up']: { y: +amount * -1 }
    }
    const subDir: { [key: string]: number } = dirs[action]
    Object.keys(subDir).forEach((dir) => sub[dir] = Math.max(sub[dir] + subDir[dir], 0));
  });
  return sub.x * sub.y;
}

export const p2 = (input: string): number => {
  const sub: { [key: string]: number } = { x: 0, y: 0, a: 0 };
  [...input.matchAll(/(\w+)\s(\d+)/g)].forEach(([, action, amount]) => {
    const dirs: { [key: string]: { x?: number, a?: number }} = {
      ['forward']: { x: +amount },
      ['down']: { a: +amount },
      ['up']: { a: +amount * -1 }
    }
    const subDir: { [key: string]: number } = dirs[action];
    Object.keys(subDir).forEach((dir) => sub[dir] = Math.max(sub[dir] + subDir[dir], 0));
    if (subDir.x) sub.y += subDir.x * sub.a;
  });
  return sub.x * sub.y;
}