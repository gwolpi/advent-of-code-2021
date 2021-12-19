import { p1, p2 } from './18.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

Deno.test('it should run the first part of day 18 correctly', () => {
  const result = p1('[[1,2],[[3,4],5]]');
  const expected = 143;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 18 correctly', () => {
  const result = p1('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]');
  const expected = 1384;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 18 correctly', () => {
  const result = p1('[[[[1,1],[2,2]],[3,3]],[4,4]]');
  const expected = 445;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 18 correctly', () => {
  const result = p1('[[[[3,0],[5,3]],[4,4]],[5,5]]');
  const expected = 791;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 18 correctly', () => {
  const result = p1('[[[[5,0],[7,4]],[5,5]],[6,6]]');
  const expected = 1137;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 18 correctly', () => {
  const result = p1('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]');
  const expected = 3488;
  assertEquals(result, expected);
});

const input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

Deno.test('it should run the first part of day 18 correctly', () => {
  const result = p1(input);
  const expected = 4140;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 18 correctly', () => {
  const result = p2(input);
  const expected = 3993;
  assertEquals(result, expected);
});
