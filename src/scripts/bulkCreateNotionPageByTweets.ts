/**
 * Sample:
 * yarn ts-node src/scripts/bulkCreateNotionPageByTweets.ts src/scripts/tmp/tweets-sample.js
 */

import process from "process";
import path from "path";
import { createNotionPageByTweet } from "../createNotionPageByTweet";

const fileName = process.argv[2] || "tweets.js";
const tweetsJson = require(path.resolve(fileName));

const username = "kojo_73";

async function addTweetsToNotionDatabase(tweets: any[]) {
  for (const tweet of tweets) {
    await addTweetToNotionDatabase(tweet);
    await new Promise((resolve) => setTimeout(resolve, 334)); // Limit to 3 requests per second, send requests at intervals of 334ms
  }
}

addTweetsToNotionDatabase(tweetsJson);

async function addTweetToNotionDatabase(tweet: any) {
  try {
    const createdDate = new Date(tweet.tweet.created_at + " UTC");
    createdDate.setHours(createdDate.getHours() + 9);
    const adjustedDate = createdDate.toISOString();

    const tweetUrl = `https://twitter.com/${username}/status/${tweet.tweet.id}`;

    const response = await createNotionPageByTweet({
      text: tweet.tweet.full_text,
      createdAt: adjustedDate,
      type: "tweet",
      url: tweetUrl,
      username,
    });

    console.log("New page created:", response.id, tweet.tweet.id);
  } catch (error: any) {
    if (error.code) {
      console.error("API error:", error.code, error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}
