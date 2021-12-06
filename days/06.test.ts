import { p1, p2 } from './06.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = '3,4,3,1,2';

Deno.test('it should run the first part of day 06 correctly', () => {
  const result = p1(input);
  const expected = 5934;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 06 correctly', () => {
  const result = p2(input);
  const expected = 26984457539;
  assertEquals(result, expected);
});
