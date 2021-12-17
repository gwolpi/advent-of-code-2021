const run = (input: string, partNumber: number): number => {
  const [, minX, maxX, minY, maxY] = input.match(/target area: x=(\d+)\.\.(\d+), y=(-?\d+)\.\.(-?\d+)/)!.map(Number);
  const peakYs = [];
  for (let vx = 0; vx <= maxX; vx++) 
    for (let vy = minY; vy <= Math.abs(minY); vy++) {
      let x = 0, y = 0, dx = vx, dy = vy, peakY = minY;
      while(x <= maxX && y >= minY) {
        x += dx; y += dy;
        dy--; dx = Math.max(0, dx - 1); 
        peakY = y > peakY ? y : peakY;
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          peakYs.push(peakY)
          break;
        }
      }
    }
  return [Math.max(...peakYs), peakYs.length][partNumber - 1];
}

export const p1 = (input: string): number => run(input, 1)

export const p2 = (input: string): number => run(input, 2);