/**
 * 短縮されたURLを元のURLに変換する
 */
async function replaceShortUrl(shortUrl: string) {
  try {
    // fetchリクエストを送信し、リダイレクトを手動で処理する
    const response = await fetch(shortUrl, { redirect: "manual" });

    if (response.status >= 300 && response.status < 400) {
      // リダイレクトレスポンスの場合、LocationヘッダーからURLを取得
      return response.headers.get("Location") ?? shortUrl;
    }

    // リダイレクトがない場合は、元のURLをそのまま返す
    return shortUrl;
  } catch (error) {
    // エラーで元のURLを取得できなかった場合は、短縮URLをそのまま返す
    console.warn(error);
    return shortUrl;
  }
}

export async function parseTextAndUrl(input: string) {
  // Define regex to detect URLs in the input string
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  let match: RegExpExecArray | null;
  let lastIndex = 0;
  let output: Array<any> = [];

  // Loop over the input string to find URLs and split the text around them
  while ((match = urlRegex.exec(input)) !== null) {
    const matchedUrl = await replaceShortUrl(match[0]);

    // Extract the text before the URL
    if (match.index > lastIndex) {
      const textBefore = input.substring(lastIndex, match.index);
      output.push({
        type: "text",
        text: {
          content: textBefore,
        },
      });
    }

    // Add the URL to the output array with the appropriate format
    output.push({
      type: "text",
      text: {
        content: matchedUrl,
        link: {
          url: matchedUrl,
        },
      },
    });

    // Update the index to start from after this URL for the next iteration
    lastIndex = urlRegex.lastIndex;
  }

  // Add any remaining text after the last URL
  if (lastIndex < input.length) {
    const textAfter = input.substring(lastIndex);
    output.push({
      type: "text",
      text: {
        content: textAfter,
      },
    });
  }

  return output;
}
