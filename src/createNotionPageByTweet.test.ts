import { setupServer } from "msw/node";
import { rest } from "msw";
import { test, vi, expect, beforeAll, afterEach, afterAll } from "vitest";
import { createNotionPageByTweet } from "./createNotionPageByTweet";

// MSW (Mock Service Worker) の設定
const server = setupServer(
  rest.post("https://api.notion.com/v1/pages", (req, res, ctx) => {
    return res(
      ctx.json({
        id: "123456",
        object: "page",
        created_time: "2023-05-26T12:00:00.000Z",
        last_edited_time: "2023-05-26T12:00:00.000Z",
      })
    );
  })
);

// サーバーの起動と終了
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("createNotionPageByTweetが正しく動作する", async () => {
  // モックデータ
  const mockData = {
    text: "サンプルテキスト",
    username: "username",
    url: "https://twitter.com/username/status/123456",
    createdAt: "May 26, 2023 at 12:00PM",
    type: "tweet",
  } as const;

  // 関数の実行
  const result = await createNotionPageByTweet(mockData);

  // 結果の検証
  expect(result).toEqual({
    id: "123456",
    object: "page",
    created_time: "2023-05-26T12:00:00.000Z",
    last_edited_time: "2023-05-26T12:00:00.000Z",
  });
});
