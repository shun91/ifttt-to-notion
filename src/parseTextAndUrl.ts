export function parseTextAndUrl(input: string) {
  // Define regex to detect URLs in the input string
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  let match: RegExpExecArray | null;
  let lastIndex = 0;
  let output: Array<any> = [];

  // Loop over the input string to find URLs and split the text around them
  while ((match = urlRegex.exec(input)) !== null) {
    const matchedUrl = match[0];

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
