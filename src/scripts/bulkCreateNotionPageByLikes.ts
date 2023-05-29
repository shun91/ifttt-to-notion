/**
 * Sample:
 * yarn ts-node src/scripts/bulkCreateNotionPageByLikes.ts src/scripts/tmp/likes-sample.js
 */

import process from "process";
import path from "path";
import { createNotionPageByTweet } from "../createNotionPageByTweet";

const fileName = process.argv[2] || "likes.js";
const tweetsJson = require(path.resolve(fileName));

async function addTweetsToNotionDatabase(tweets: any[]) {
  for (const tweet of tweets) {
    await addTweetToNotionDatabase(tweet);
    await new Promise((resolve) => setTimeout(resolve, 334)); // Limit to 3 requests per second, send requests at intervals of 334ms
  }
}

addTweetsToNotionDatabase(tweetsJson);

async function addTweetToNotionDatabase(tweet: any) {
  try {
    const response = await createNotionPageByTweet({
      text: tweet.like.fullText,
      type: "like",
      url: tweet.like.expandedUrl,
      username: "",
    });

    console.log("New page created:", response.id, tweet.like.tweetId);
  } catch (error: any) {
    if (error.code) {
      console.error("API error:", error.code, error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}
