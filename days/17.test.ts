import { p1, p2 } from './17.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = 'target area: x=20..30, y=-10..-5';

Deno.test('it should run the first part of day 17 correctly', () => {
  const result = p1(input);
  const expected = 45;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 17 correctly', () => {
  const result = p2(input);
  const expected = 112;
  assertEquals(result, expected);
});
