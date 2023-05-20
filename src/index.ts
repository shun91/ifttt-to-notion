import * as functions from "@google-cloud/functions-framework";
import { Client } from "@notionhq/client";

const apiKey = process.env.NOTION_API_KEY;
const databaseId = "50c2c7504a404f30bc7a222e8b565396";

const notion = new Client({ auth: apiKey });

export const helloHttp = functions.http(
  "helloHttp",
  async (req: functions.Request, res: functions.Response) => {
    const url = "https://twitter.com/kojo_73/status/3874734738";
    const text = "for gcf";

    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          name: {
            title: [
              {
                text: {
                  content: url,
                },
              },
            ],
          },
          text: {
            type: "rich_text",
            rich_text: [
              {
                text: {
                  content: text,
                },
              },
            ],
          },
          tweet_created_at: {
            type: "date",
            date: {
              start: new Date().toISOString(),
            },
          },
          url: {
            url: url,
          },
        },
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
