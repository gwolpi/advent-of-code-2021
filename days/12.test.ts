import { p1, p2 } from './12.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = 'start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end';

Deno.test('it should run the first part of day 12 correctly', () => {
  const result = p1(input);
  const expected = 10;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 12 correctly', () => {
  const result = p2(input);
  const expected = 36;
  assertEquals(result, expected);
});
