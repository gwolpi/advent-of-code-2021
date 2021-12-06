const FISH_SPAWN_STAGE = 6;
const FISH_LIFECYCLE = 8;

const calculateFish = (input: string, days: number) => {
  const fishPerStage = input.split(",").reduce((acc: { [key: string]: number }, curr: string) => {
    acc[curr] = (acc[curr] || 0 ) + 1;
    return acc;
  }, {} );
  const fishPerLifeStage = Array.from({ length: FISH_LIFECYCLE + 1}, (_, i) => fishPerStage[i] || 0);
  for (let day = 0; day < days; day++) {
    const createdFishes = fishPerLifeStage.shift();
    fishPerLifeStage[FISH_SPAWN_STAGE] += createdFishes!;
    fishPerLifeStage.push(createdFishes!);
  }
  return fishPerLifeStage.reduce((totalFish, fishInLifeStage) => totalFish + fishInLifeStage);
}

export const p1 = (input: string) => calculateFish(input, 80);

export const p2 = (input: string) => calculateFish(input, 256);
