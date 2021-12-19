type Coord = [number, number, number];
type Overlap = { coord: Coord, pos: Coord, dir: Coord };
type Scanner = { id: number, beacons: Coord[] } & Partial<Overlap>;

const processInput = (input: string): Scanner[] => {
  return input.split('\n\n').map(x => x.split('\n')).map(([ name, ...data ]) => {
    const [id] = name.match(/(\d+)/)?.map(Number)!;
    const beacons: Coord[] = data.filter(x => !!x.trim()).map(beacon => {
      const [, x, y, z ] = beacon.match(/(\-?\d+),(\-?\d+),(\-?\d+)/)!.map(Number);
      return [x, y, z];
    });
    return { id, beacons }
  })
}

const setScannerDetails = (scanner: Scanner, coord: Coord, pos: Coord, dir: Coord): void => {
  scanner.coord = coord;
  scanner.dir = dir;
  scanner.pos = pos;
}

const encodeOverlap = (overlap: Overlap): string => 
  JSON.stringify(overlap).replaceAll(/[\s\n]/g, '');

const decodeOverlap = (encodedOverlap: string): Overlap => 
  JSON.parse(encodedOverlap) as Overlap;

const encodeCoordinates = (coords: Coord[]): string[] => 
  coords.map(coord => JSON.stringify(coord).replaceAll(/[\s\n]/g, ''));

const decodeCoordinates = (encodedCoords: string[]): Coord[] =>
  encodedCoords.map(coord => JSON.parse(coord) as Coord);

const positions: Coord[] = [
  [0,1,2],
  [1,0,2],
  [2,0,1],
  [0,2,1],
  [1,2,0],
  [2,1,0],
];

const directions: Coord[] = [
  [1,1,1],
  [1,1,-1],
  [1,-1,1],
  [1,-1,-1],
  [-1,1,1],
  [-1,1,-1],
  [-1,-1,1],
  [-1,-1,-1],
];

const calibrateScanners = (input: string) => {
  const scanners = processInput(input);
  let [absoluteScanner, ...relativeScanners] = scanners;
  setScannerDetails(absoluteScanner, [0,0,0], positions[0], directions[0]);
  while (relativeScanners.length) {
    for(const relativeScanner of relativeScanners) {
      const overlapCounter: { [key: string]: number } = {};
      for(const absoluteBeacon of absoluteScanner.beacons) 
        for (const relativeBeacon of relativeScanner.beacons) 
          for (const pos of positions) 
            for (const dir of directions) {
              const relativeBeaconPosition = pos
                .map((axes: number) => relativeBeacon[axes] * dir[axes])
              if (relativeBeaconPosition.some((axes) => Object.is(axes, -0))) continue;
              const [ absX, absY, absZ ] = absoluteBeacon;
              const [ relX, relY, relZ ] = relativeBeaconPosition;
              const coord: Coord = [ absX - relX, absY - relY, absZ - relZ ];
              const overlap: Overlap = { coord, pos, dir };
              const encoded = encodeOverlap(overlap);
              overlapCounter[encoded] ||= 0; overlapCounter[encoded]++;
            }
      const eligibleOverlap = Object.entries(overlapCounter).find(([, count]) => count >= 12)
      if (!eligibleOverlap) continue;
      const { coord, pos, dir } = decodeOverlap(eligibleOverlap[0]);
      relativeScanners = relativeScanners.filter(scanner => scanner !== relativeScanner);
      setScannerDetails(relativeScanner, coord, pos, dir);
      const beaconCoordinates = decodeCoordinates([...new Set([
        ...encodeCoordinates(absoluteScanner.beacons),
        ...encodeCoordinates(relativeScanner.beacons.map((beacon) => 
          relativeScanner.pos!.map((pos, i) => 
            beacon[pos] * relativeScanner.dir![pos] + relativeScanner.coord![i])) as Coord[])
      ])]);
      absoluteScanner.beacons = beaconCoordinates;
      break;
    }
  }
  return scanners
}

export const p1 = (input: string): number => {
  const [scanner] = calibrateScanners(input);
  return scanner.beacons.length;
}

export const p2 = (input: string): number => {
  const scanners = calibrateScanners(input);
  const manhattanDist = ([ax, ay, az]: Coord, [bx, by, bz]: Coord) => 
    Math.abs(ax - bx) + Math.abs(ay - by) + Math.abs(az - bz);
  return scanners.reduce((acc, currScanner) => {
    scanners.forEach((scanner) => {
      const dist = manhattanDist(currScanner.coord!, scanner.coord!);
      acc = dist > acc ? dist : acc;
    });
    return acc;
  }, 0);
} 