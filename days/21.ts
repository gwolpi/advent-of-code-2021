type Player = { pos: number, score: number };

export const p1 = (input: string): number => {
  const game = [...input.matchAll(/Player \d starting position: (\d+)/g)].map(([, position]) => {
    return{pos: +position, score :0};
  });
  let totalRolls = 0;
  let d100 = 0;
  const roll = (): number => {
    d100 = ((d100 + 1) % 100) || 100;
    totalRolls++
    return d100;
  }
  let winner: Player | undefined;
  while (!winner) {
    for (const player of game) {
      const playerRoll = roll() + roll() + roll();
      const playerPos = ((player.pos + playerRoll) % 10) || 10;
      player.pos = playerPos;
      player.score += playerPos;
      winner = game.find(player => player.score >= 1000);
      if (winner) break;
    }
  }
  const loser = game.find(player => player !== winner)!;
  return totalRolls * loser.score;
}

export const p2 = (input: string): number => {
  const game = [...input.matchAll(/Player \d starting position: (\d+)/g)]
  const rollCount = [ [3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1], ];
  const winsPerPlayer = Array.from({ length: game.length }, () => 0);
  const scorePerPlayer = Array.from({ length: game.length }, () => 0);
  const posPerPlayer = game.map(([, pos]) => Number(pos));
  const rollDie = (pos: number[], score: number[], playerIdWithTurn: number, multiplier = 1): void => {
    for (const [roll, count] of rollCount) {
      const currPos = [...pos];
      const currScore = [...score];
      const playerPos = (currPos[playerIdWithTurn] + roll) % 10 || 10;
      currPos[playerIdWithTurn] = playerPos;
      currScore[playerIdWithTurn] += playerPos;
      if (currScore[playerIdWithTurn] >= 21) {
        winsPerPlayer[playerIdWithTurn] += multiplier * count;
        continue;
      } 
      rollDie(currPos, currScore, (playerIdWithTurn + 1) % game.length, multiplier * count);
    } 
  }
  rollDie(posPerPlayer, scorePerPlayer, 0);
  return Math.max(...winsPerPlayer);
}