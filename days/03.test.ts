import { p1, p2 } from './03.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = '00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010';

Deno.test('it should run the first part of day 03 correctly', () => {
  const result = p1(input);
  const expected = 198;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 03 correctly', () => {
  const result = p2(input);
  const expected = 230;
  assertEquals(result, expected);
});
