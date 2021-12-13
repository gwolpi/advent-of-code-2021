import { p1, p2 } from './12.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input = 'dc-end\nHN-start\nstart-kj\ndc-start\ndc-HN\nLN-dc\nHN-end\nkj-sa\nkj-HN\nkj-dc';

Deno.test('it should run the first part of day 12 correctly', () => {
  const result = p1(input);
  const expected = 19;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 12 correctly', () => {
  const result = p2(input);
  const expected = 103;
  assertEquals(result, expected);
});
