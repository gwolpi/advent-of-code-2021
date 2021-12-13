import { p1, p2 } from './10.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

const input =
  `[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`;

Deno.test('it should run the first part of day 10 correctly', () => {
  const result = p1(input);
  const expected = 26397;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 10 correctly', () => {
  const result = p2(input);
  const expected = 288957;
  assertEquals(result, expected);
});
