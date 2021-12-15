import { p1, p2 } from './15.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = '1163751742\n1381373672\n2136511328\n3694931569\n7463417111\n1319128137\n1359912421\n3125421639\n1293138521\n2311944581';

Deno.test('it should run the first part of day 15 correctly', () => {
  const result = p1(input);
  const expected = 40;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 15 correctly', () => {
  const result = p2(input);
  const expected = 315;
  assertEquals(result, expected);
});
