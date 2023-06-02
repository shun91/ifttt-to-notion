# ifttt-to-notion

IFTTT の Webhook を受け取り Notion API を叩く Google Cloud Functions

## 使用方法

### Google Cloud Functions へのデプロイ

このリポジトリでは GitHub Actions を使用して Google Cloud Functions へのデプロイを自動化しています。具体的な設定は`.github/workflows/deploy.yml`を参照してください。

デプロイを実施するには以下の準備が必要です。

- Google Cloud のアカウントとプロジェクトが必要です。これは Google Cloud Functions へのデプロイに使用されます。
- 適切な権限を持つサービスアカウントが必要です。このサービスアカウントの認証情報（`GCP_WORKLOAD_IDENTITY_PROVIDER`、`GCP_SERVICE_ACCOUNT`）を GitHub Secrets に設定する必要があります。
  - 参考：[GitHub Actions から Google Cloud Functions にデプロイ | blog.shgnkn.io](https://blog.shgnkn.io/github-actions-deploy-google-cloud-functions/)
- Notion API と IFTTT の Webhook からのリクエストの認証に使用される`NOTION_API_KEY`と`ACCESS_TOKEN`も GitHub Secrets に設定する必要があります。

### IFTTT の設定

前提として、Twitter と連携するため、Pro 以上の IFTTT アカウントが必要です（有料）。

IFTTT で Webhook を設定するには、新しいアプレットを作成し、そのトリガーとして Webhook を選択します。その後、トリガーが発生した際に送信される Webhook の URL を、Google Cloud Functions の URL に設定します。この URL は、Google Cloud Functions をデプロイした後に得られます。  
また、Additional Headers に `ACCESS_TOKEN` を設定します。これは GitHub Secrets にした `ACCESS_TOKEN` です。

詳細な設定内容は以下のキャプチャを参照してください。

![image](https://github.com/shun91/ifttt-to-notion/assets/8047437/d287a595-9feb-4668-98e0-a442f22f67e4)

![image](https://github.com/shun91/ifttt-to-notion/assets/8047437/e5b79403-2ae8-4c29-a36e-4dd3fb08aa6c)

### Notion の設定

coming soon...

これで設定は完了です。  
IFTTT で指定したアカウントでツイートすると、その内容が Notion Database に追加されます。

## 開発方法

### ビルド

```sh
yarn build
```

### ローカル実行

```sh
yarn dev
```

Web サーバーが立ち上がります。以下の URL を叩くことで動作確認できます。
http://localhost:8080/iftttToNotion

### ユニットテスト

```sh
yarn test
```
