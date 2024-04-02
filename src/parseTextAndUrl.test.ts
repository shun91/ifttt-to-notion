import { setupServer } from "msw/node";
import { parseTextAndUrl } from "./parseTextAndUrl"; // 適切なパスに置き換えてください
import { test, expect, beforeAll, afterAll, afterEach } from "vitest";
import { rest } from "msw";

const server = setupServer(
  rest.get("*", (req, res, ctx) => {
    return res(ctx.json({ data: "mocked data" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("URLを含むテキストをパースする", async () => {
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

  const result = await parseTextAndUrl(testInput);

  expect(result).toEqual(expectedOutput);
});

test("URLを含まないテキストをパースする", async () => {
  const testInput = "こんにちは、このテキストにはURLが含まれていません";
  const expectedOutput = [
    {
      type: "text",
      text: {
        content: "こんにちは、このテキストにはURLが含まれていません",
      },
    },
  ];

  const result = await parseTextAndUrl(testInput);

  expect(result).toEqual(expectedOutput);
});

test("テキストがURLのみである場合のパース", async () => {
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

  const result = await parseTextAndUrl(testInput);

  expect(result).toEqual(expectedOutput);
});

test("短縮URLの場合はリダイレクトレスポンスのLocationヘッダーから元のURLを取得して変換する", async () => {
  const testInput = "http://redirect.com";
  const originalUrl = "http://finalurl.com";
  const expectedOutput = [
    {
      type: "text",
      text: {
        content: originalUrl,
        link: {
          url: originalUrl,
        },
      },
    },
  ];

  server.use(
    rest.get(testInput, (req, res, ctx) => {
      return res(ctx.status(302), ctx.set("Location", originalUrl));
    })
  );

  const result = await parseTextAndUrl(testInput);

  expect(result).toEqual(expectedOutput);
});
