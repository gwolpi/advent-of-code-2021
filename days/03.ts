export const p1 = (input: string): number => {
  const lines = input.split('\n').map(line => line.split(''));
  const vertLines = lines[0].map((_, index) => lines.reduce((acc, line) => acc += line[index], ''));
  const binary = vertLines.map(x => {
    const noughties = x.split('0');
    return noughties.length - 1 >= noughties.join('').length ? '0' : '1';
  }).join('');
  const gammaRate  = parseInt(binary, 2);
  const epsilonRate = gammaRate ^ parseInt((new Array(binary.length+1)).join("1"),2);
  return gammaRate * epsilonRate;
}

export const p2 = (input: string): number => {
  const lines = input.split('\n');
  const [ oxygenGeneratorRating, co2ScrubberRating ] = ([
    (noughties, ones) => `${Number(noughties <= ones)}`,
    (noughties, ones) => `${Number(noughties > ones)}`, 
  ] as ((noughties: number, linesLength: number) => string)[]).map((func) => {
    let remainingLines = [ ...lines ];
    for(let i = 0; i < lines[0].length; i++) {
      const remainingNoughties = remainingLines.map(x => x[i]).join('').split('0').length - 1;
      const bitForPos = func(remainingNoughties, remainingLines.length - remainingNoughties);
      remainingLines = remainingLines.filter(x => x[i] === bitForPos);
      if(remainingLines.length === 1) return parseInt(remainingLines[0], 2);
    }
  });
  return oxygenGeneratorRating! * co2ScrubberRating!;
}
