import { p1, p2 } from './16.ts';
import { assertEquals } from "https://deno.land/x/std@0.65.0/testing/asserts.ts";

Deno.test('it should run the first part of day 16 correctly', () => {
  const result = p1('D2FE28');
  const expected = 6;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 16 correctly', () => {
  const result = p1('EE00D40C823060');
  const expected = 14;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 16 correctly', () => {
  const result = p1('8A004A801A8002F478');
  const expected = 16;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 16 correctly', () => {
  const result = p1('620080001611562C8802118E34');
  const expected = 12;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 16 correctly', () => {
  const result = p1('C0015000016115A2E0802F182340');
  const expected = 23;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 16 correctly', () => {
  const result = p1('A0016C880162017C3686B18A3D4780');
  const expected = 31;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
  const result = p2('C200B40A82');
  const expected = 3;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
  const result = p2('04005AC33890');
  const expected = 54;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
  const result = p2('880086C3E88112');
  const expected = 7;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
  const result = p2('CE00C43D881120');
  const expected = 9;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
  const result = p2('D8005AC2A8F0');
  const expected = 1;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
  const result = p2('F600BC2D8F');
  const expected = 0;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
  const result = p2('9C005AC2F8F0');
  const expected = 0;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
  const result = p2('9C0141080250320F1802104A08');
  const expected = 1;
  assertEquals(result, expected);
});