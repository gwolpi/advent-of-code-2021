import { p1, p2 } from './14.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = 'NNCB\n\nCH -> B\nHH -> N\nCB -> H\nNH -> C\nHB -> C\nHC -> B\nHN -> C\nNN -> C\nBH -> H\nNC -> B\nNB -> B\nBN -> B\nBB -> N\nBC -> B\nCC -> N\nCN -> C';

Deno.test('it should run the first part of day 14 correctly', () => {
  const result = p1(input);
  const expected = 1588;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 14 correctly', () => {
  const result = p2(input);
  const expected = 2188189693529;
  assertEquals(result, expected);
});
