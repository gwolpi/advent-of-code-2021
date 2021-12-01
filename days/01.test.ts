import { p1, p2 } from './01.ts'
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = '199\n200\n208\n210\n200\n207\n240\n269\n260\n263';

Deno.test('it should run the first part of day 01 correctly', () => {
  const result = p1(input);
  const expected = 7;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 01 correctly', () => {
  const result = p2(input);
  const expected = 5;
  assertEquals(result, expected);
});
