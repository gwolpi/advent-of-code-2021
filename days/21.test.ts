import { p1, p2 } from './21.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = 'Player 1 starting position: 4\nPlayer 2 starting position: 8';

Deno.test('it should run the first part of day 21 correctly', () => {
  const result = p1(input);
  const expected = 739785;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 21 correctly', () => {
  const result = p2(input);
  const expected = 444356092776315;
  assertEquals(result, expected);
});
