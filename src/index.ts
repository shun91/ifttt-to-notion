import * as functions from "@google-cloud/functions-framework";
import { createNotionPageByTweet } from "./createNotionPageByTweet";

type RequestBody = {
  text: string;
  userName: string;
  linkToTweet: string;
  createdAt: string;
  type: "tweet" | "like";
};

const accessToken = process.env.ACCESS_TOKEN;

export const iftttToNotion = functions.http(
  "iftttToNotion",
  async (req: functions.Request, res: functions.Response) => {
    // accessTokenが不正なら401を返す
    if (req.headers.authorization !== `Bearer ${accessToken}`) {
      const error = { status: 401, message: "Unauthorized" };
      console.error(error);
      res.status(401).json(error);
      return;
    }

    const body: RequestBody = req.body;
    const url = body.linkToTweet;
    const text = body.text;
    const createdAt = body.createdAt;
    const username = body.userName;
    const type = body.type;

    try {
      const response = await createNotionPageByTweet({
        text,
        createdAt,
        type,
        url,
        username,
      });
      console.log("New page created:", response);
      res.json(response);
    } catch (error: any) {
      if (error.code) {
        console.error("API error:", error.code, error.message);
        res.status(500).json(error);
      } else {
        console.error("Unknown error:", error);
        res.status(500).json(error);
      }
    }
  }
);
