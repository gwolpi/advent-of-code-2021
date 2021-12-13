import { p1, p2 } from './13.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = '6,10\n0,14\n9,10\n0,3\n10,4\n4,11\n6,0\n6,12\n4,1\n0,13\n10,12\n3,4\n3,0\n8,4\n1,10\n2,14\n8,10\n9,0\n\nfold along y=7\nfold along x=5';

Deno.test('it should run the first part of day 13 correctly', () => {
  const result = p1(input);
  const expected = 17;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 13 correctly', () => {
  const result = p2(input);
  const expected = '\n🟥🟥🟥🟥🟥\n🟥⬜⬜⬜🟥\n🟥⬜⬜⬜🟥\n🟥⬜⬜⬜🟥\n🟥🟥🟥🟥🟥';
  assertEquals(result, expected);
});
