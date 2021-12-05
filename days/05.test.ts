import { p1, p2 } from './05.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = '0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2';

Deno.test('it should run the first part of day 05 correctly', () => {
  const result = p1(input);
  const expected = 5;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 05 correctly', () => {
  const result = p2(input);
  const expected = 12;
  assertEquals(result, expected);
});
