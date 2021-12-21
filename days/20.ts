type Image = { [key: string]: { [key: string] : string }};


const enhanceImage = (originalImage: Image, imageEnhancementAlgorithm: string): Image => {
  const enhancedImage: Image = {};
  const neighbors = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1], ];
  const ys = Object.keys(originalImage).map(Number);
  const xs = Object.values(originalImage).reduce((xs, y) => [...xs, ...Object.keys(y).map(Number)], [] as number[]);
  for(let y = Math.min(...ys); y <= Math.max(...ys); y++)
    for(let x = Math.min(...xs); x <= Math.max(...xs); x++) {
      const centered = neighbors.map(([yp, xp]) => originalImage[y + yp]?.[x + xp] || '.');
      const binary = centered.map(pixel => Number(pixel === '#')).join("");
      (enhancedImage[y] ||= {})[x] = imageEnhancementAlgorithm[parseInt(binary, 2)];
    }
  return enhancedImage;
};

const processInput = (input: string, enhancing = 2) => {
  const [ imageEnhancementAlgorithm, imageData ] = input.split('\n\n');
  let image: Image = {};
  const splitData = imageData.split('\n');
  splitData.forEach((imageRow, y) => {
    imageRow.split('').forEach((imageColVal, x) => {
      (image[y] ||= {})[x] = imageColVal;
    });
  });
  (image[-2 * enhancing] ||= {})[-2 * enhancing] = '.';
  (image[splitData.length - 1 + (2 * enhancing)] ||= {})[splitData[0].length - 1 + (2 * enhancing)] = '.';
  Array.from({length: enhancing }).forEach(() => {
    image = enhanceImage(image, imageEnhancementAlgorithm);
  });

  return Object.values(image).reduce((acc, curr) => 
    acc + Object.values(curr).filter(x => x === '#').join(''), '').length;
};

export const p1 = (input: string): number => processInput(input.trim());

export const p2 = (input: string): number => processInput(input.trim(), 50);
