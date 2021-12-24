import { p1, p2 } from './22.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = 'on x=10..12,y=10..12,z=10..12\non x=11..13,y=11..13,z=11..13\noff x=9..11,y=9..11,z=9..11\non x=10..10,y=10..10,z=10..10';

Deno.test('it should run the first part of day 22 correctly', () => {
  const result = p1(input);
  const expected = 39;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 22 correctly', () => {
  const result = p2(input);
  const expected = 0;
  assertEquals(result, expected);
});
