const RESET_TIMER_TO = 6;
const BABY_FISH_TIMER = 8;

const calculateFish = (input: string, days: number) => {
  const fishPerLifeStage = Array.from({ length: BABY_FISH_TIMER + 1}, () => 0);
  input.split(",").map(Number).forEach((lifeStage: number) => ++fishPerLifeStage[BABY_FISH_TIMER - lifeStage]);
  for (let day = 0; day < days; day++) {
    const fishesInDelivery = fishPerLifeStage.pop();
    fishPerLifeStage[BABY_FISH_TIMER - RESET_TIMER_TO - 1] += fishesInDelivery!;
    fishPerLifeStage.unshift(fishesInDelivery!);
  }
  return fishPerLifeStage.reduce((a, b) => a + b);
}

export const p1 = (input: string) => calculateFish(input, 80);

export const p2 = (input: string) => calculateFish(input, 256);
