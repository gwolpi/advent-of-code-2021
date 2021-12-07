export const p1 = (input: string) => {
  const positions = input.split(",").map(Number);
  return Math.min(...positions.reduce((x, _, i) => 
  [ ...x, positions
    .map(crab => Math.abs(crab - i))
    .reduce((a, b) => a + b)], [] as number[]));
}

export const p2 = (input: string): number => {
  const positions = input.split(",").map(Number);
  return Math.min(...positions.reduce((x, _, i) => 
  [ ...x, positions
    .map(crab => Math.abs(crab - i))
    .map(usage => usage * (usage + 1) / 2)
    .reduce((a, b) => a + b)], [] as number[]));
}