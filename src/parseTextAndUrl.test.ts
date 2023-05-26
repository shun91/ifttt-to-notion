import { parseTextAndUrl } from "./parseTextAndUrl"; // 適切なパスに置き換えてください
import { test, expect } from "vitest";

test("URLを含むテキストをパースする", () => {
  const testInput =
    "こんにちは、このリンクを見てください：https://example.com またこちらも：https://openai.com";
  const expectedOutput = [
    {
      type: "text",
      text: {
        content: "こんにちは、このリンクを見てください：",
      },
    },
    {
      type: "text",
      text: {
        content: "https://example.com",
        link: {
          url: "https://example.com",
        },
      },
    },
    {
      type: "text",
      text: {
        content: " またこちらも：",
      },
    },
    {
      type: "text",
      text: {
        content: "https://openai.com",
        link: {
          url: "https://openai.com",
        },
      },
    },
  ];

  const result = parseTextAndUrl(testInput);

  expect(result).toEqual(expectedOutput);
});

test("URLを含まないテキストをパースする", () => {
  const testInput = "こんにちは、このテキストにはURLが含まれていません";
  const expectedOutput = [
    {
      type: "text",
      text: {
        content: "こんにちは、このテキストにはURLが含まれていません",
      },
    },
  ];

  const result = parseTextAndUrl(testInput);

  expect(result).toEqual(expectedOutput);
});

test("テキストがURLのみである場合のパース", () => {
  const testInput = "https://onlyurl.com";
  const expectedOutput = [
    {
      type: "text",
      text: {
        content: "https://onlyurl.com",
        link: {
          url: "https://onlyurl.com",
        },
      },
    },
  ];

  const result = parseTextAndUrl(testInput);

  expect(result).toEqual(expectedOutput);
});
