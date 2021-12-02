import { p1, p2 } from './02.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = 'forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2';

Deno.test('it should run the first part of day 02 correctly', () => {
  const result = p1(input);
  const expected = 150;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 02 correctly', () => {
  const result = p2(input);
  const expected = 900;
  assertEquals(result, expected);
});
