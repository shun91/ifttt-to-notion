import { setupServer } from "msw/node";
import { rest } from "msw";
import { test, vi, expect, beforeAll, afterEach, afterAll } from "vitest";
import { createNotionPageByTweet } from "./createNotionPageByTweet";

const mockFn = vi.fn();

// MSW (Mock Service Worker) の設定
const server = setupServer(
  rest.post("https://api.notion.com/v1/pages", async (req, res, ctx) => {
    const body = await req.json();
    mockFn(body);
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
afterEach(() => {
  server.resetHandlers();
  mockFn.mockClear();
});
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

test("createdAtが渡されていない場合、propertiesにtweet_created_atを設定しない", async () => {
  // モックデータ
  const mockData = {
    text: "サンプルテキスト",
    username: "username",
    url: "https://twitter.com/username/status/123456",
    type: "tweet",
  } as const;

  // 関数の実行
  const result = await createNotionPageByTweet(mockData);

  // tweet_created_atが設定されていないこと
  expect(mockFn.mock.calls[0][0].properties.tweet_created_at).toBeUndefined();

  // だがAPI呼び出しは実行されること
  expect(result).toEqual({
    id: "123456",
    object: "page",
    created_time: "2023-05-26T12:00:00.000Z",
    last_edited_time: "2023-05-26T12:00:00.000Z",
  });
});
