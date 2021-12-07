export const p1 = (input: string) => {
  const positions = input.split(",").map(Number);
  const fuelRequired = positions.reduce((x, _, i) => 
    [ ...x, positions
      .map((crab) => Math.abs(crab - i))
      .reduce((a, b) => a + b)], [] as number[]);
  return Math.min(...fuelRequired);
}

export const p2 = (input: string): number => {
  const positions = input.split(",").map(Number);
  const fuelRequired = positions.reduce((x, _, i) => 
    [ ...x, positions
      .map((crab) => Math.abs(crab - i))
      .map(usage => usage * (usage + 1) / 2)
      .reduce((a, b) => a + b)], [] as number[]);
  return Math.min(...fuelRequired);
}