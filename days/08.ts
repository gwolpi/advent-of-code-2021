const extractInput = (input: string) => {
  return  [...input.matchAll(/(.+)\s\|\s(.+)/g)].map(([, pattern, result]) => {
    const patterns = `${pattern}`.split(' ').map(x => [...x].sort());
    const appendix = `${result}`.split(' ').map(x => [...x].sort().join(''));
    return { patterns, appendix };
  });
}

export const p1 = (input: string): number => {
  return extractInput(input)
  .flatMap(({ appendix: x }) => x)
  .map(x => x.length)
  .filter(x => x <= 4 || x >= 7).length;
}

export const p2 = (input: string): number => {
  return extractInput(input).reduce((acc, {patterns, appendix}) => {
    let rendered: { [key: number]: string[] } = {
      [1]: patterns.find(x => x.length === 2)!,
      [7]: patterns.find(x => x.length === 3)!,
      [4]: patterns.find(x => x.length === 4)!,
      [8]: patterns.find(x => x.length === 7)!,
    };
    rendered = {
      ...rendered,
      [6]: patterns.find(x => x.length === 6 && rendered[1].some(y => !x.includes(y)))!,
      [3]: patterns.find(x => x.length === 5 && rendered[1].every(y => x.includes(y)))!,
    };
    rendered = {
      ...rendered,
      [0]: patterns.find(x => x.length === 6 && x !== rendered[6] && rendered[4].some(y => !x.includes(y)))!,
      [5]: patterns.find(x => x.length === 5 && x.every(y => rendered[6].includes(y)))!,
    };
    rendered = {
      ...rendered, 
      [2]: patterns.find(x => x.length === 5 && x !== rendered[3] && x !== rendered[5])!,
      [9]: patterns.find(x => x.length === 6 && x !== rendered[6] && x !== rendered[0])!,
    }    
    const num = Object.values(rendered).map(x => x.join(''));
    return acc + Number(appendix.map(x => num.indexOf(x)).join(''));
  }, 0);
}
