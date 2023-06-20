# scripts

## bulkCreateNotionPageByTweets.ts の使用方法

このスクリプトは、指定した JSON ファイルから「ツイート」のデータを読み取り、それぞれのツイートを Notion ページに変換します。

### 前提条件

- Node.js と yarn がインストールされていること
- ツイートのデータが含まれる JSON ファイルが存在すること
  - [こちらの手順](https://help.twitter.com/ja/managing-your-account/how-to-download-your-twitter-archive)に従ってダウンロードできます

### スクリプトの実行

以下のコマンドでスクリプトを実行します：

```bash
yarn ts-node src/scripts/bulkCreateNotionPageByTweets.ts [ファイルパス]
```

`[ファイルパス]`は、ツイートのデータが含まれる JSON を module.exports している JS へのパスを指定します。この引数を省略した場合、デフォルトで"tweets.js"という名前のファイルを読み込みます。

```bash
yarn ts-node src/scripts/bulkCreateNotionPageByTweets.ts src/scripts/tmp/tweets.js
```

### 注意事項

スクリプトは、一度に 3 リクエストを送信する制限を持っています。そのため、334 ミリ秒の間隔を開けてリクエストを送信します。

## bulkCreateNotionPageByLikes.ts の使用方法

このスクリプトは、指定した JSON ファイルから「いいねしたツイート」のデータを読み取り、それぞれのツイートを Notion ページに変換します。

基本的な使い方は bulkCreateNotionPageByTweets.ts と同じです。  
[こちらの手順](https://help.twitter.com/ja/managing-your-account/how-to-download-your-twitter-archive)ダウンロードしたファイルの中に、「いいねしたツイート」のデータが含まれているので、そちらを使用します。

```bash
yarn ts-node src/scripts/bulkCreateNotionPageByLikes.ts [ファイルパス]
```

具体例

```bash

yarn ts-node src/scripts/bulkCreateNotionPageByLikes.ts src/scripts/tmp/likes.js
```
