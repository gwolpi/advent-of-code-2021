import { p1, p2 } from './07.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = '16,1,2,0,4,2,7,1,2,14';

Deno.test('it should run the first part of day 07 correctly', () => {
  const result = p1(input);
  const expected = 37;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 07 correctly', () => {
  const result = p2(input);
  const expected = 168;
  assertEquals(result, expected);
});
