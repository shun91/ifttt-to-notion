import { test } from "vitest";
import { convertToISO8601 } from "./convertToISO8601";

test("正しい日付文字列をISO 8601に変換する", ({ expect }) => {
  const dateString = "January 1, 2023 at 12:00PM";
  const result = convertToISO8601(dateString);
  expect(result).toBe("2023-01-01T12:00:00+09:00");
});

test("無効な日付形式でエラーをスローする", ({ expect }) => {
  const dateString = "Not a date";
  expect(() => convertToISO8601(dateString)).toThrow("Invalid format");
});

test("12時間制の時刻形式を24時間制に変換する", ({ expect }) => {
  const dateString = "January 1, 2023 at 1:00PM";
  const result = convertToISO8601(dateString);
  expect(result).toBe("2023-01-01T13:00:00+09:00");
});

test("閏年の2月を正しく扱う", ({ expect }) => {
  const dateString = "February 29, 2024 at 12:00AM";
  const result = convertToISO8601(dateString);
  expect(result).toBe("2024-02-29T00:00:00+09:00");
});
