import { p1, p2 } from './09.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = '2199943210\n3987894921\n9856789892\n8767896789\n9899965678';

Deno.test('it should run the first part of day 09 correctly', () => {
  const result = p1(input);
  const expected = 15;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 09 correctly', () => {
  const result = p2(input);
  const expected = 1134;
  assertEquals(result, expected);
});
