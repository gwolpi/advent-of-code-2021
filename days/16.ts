const hexToBinary = (input: string) => 
  BigInt(`0x${input}`).toString(2).padStart(input.length * 4, "0");

const binaryToNum = (input: string[]) =>
  parseInt(input.join(''), 2) || 0;

const typeValueProcessor: { [key: number ]: (values: number[]) => number } = {
  0: (x) => x.reduce((a, b) => a + b),
  1: (x) => x.reduce((a, b) => a * b),
  2: (x) => Math.min(...x),
  3: (x) => Math.max(...x),
  5: ([one, two]) => +(one > two),
  6: ([one, two]) => +(one < two),
  7: ([one, two]) => +(one === two),
};

const binaryToPackage = (binaryBitsArr: string[], fn?: (x: number) => void): number => {
  const version = binaryBitsArr.splice(0, 3);
  if (fn) fn(binaryToNum(version));
  const type = binaryToNum(binaryBitsArr.splice(0, 3));
  if (type === 4) {
    const bytes = [];
    let hasNext = 1;
    while (!!hasNext) {
      hasNext = +(binaryBitsArr.splice(0, 1));
      bytes.push(...binaryBitsArr.splice(0, 4));
    }
    return binaryToNum(bytes);
  }
  const values = [];
  if (+binaryBitsArr.splice(0, 1)! === 0) {
    const lengthSign = binaryBitsArr.splice(0, 15);
    const length = binaryToNum(lengthSign);
    const bits = binaryBitsArr.splice(0, length);
    while (bits.length > 0) values.push(binaryToPackage(bits, fn));
  } else {
    const length = binaryToNum(binaryBitsArr.splice(0, 11));
    for(let i = 0; i < length && binaryBitsArr.length; i++)
      values.push(binaryToPackage(binaryBitsArr, fn));
  }
  return typeValueProcessor[type](values);
};

export const p1 = (input: string): number => {
  const binaryBits = hexToBinary(input.replaceAll(/[\n\s]/g, ''));
  let versionSum = 0;
  const counterFn = (version: number) => { versionSum += version };
  binaryToPackage(binaryBits.split(''), counterFn);
  return versionSum;
}

export const p2 = (input: string): number => {
  const binaryBits = hexToBinary(input.replaceAll(/[\n\s]/g, ''));
  return binaryToPackage(binaryBits.split(''));
}