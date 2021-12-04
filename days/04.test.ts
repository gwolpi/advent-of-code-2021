import { p1, p2 } from './04.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n\n22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19\n\n 3 15  0  2 22\n 9 18 13 17  5\n19  8  7 25 23\n20 11 10 24  4\n14 21 16 12  6\n\n14 21 17 24  4\n10 16 15  9 19\n18  8 23 26 20\n22 11 13  6  5\n 2  0 12  3  7';

Deno.test('it should run the first part of day 04 correctly', () => {
  const result = p1(input);
  const expected = 4512;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 04 correctly', () => {
  const result = p2(input);
  const expected = 1924;
  assertEquals(result, expected);
});