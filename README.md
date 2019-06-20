# Server

Builders - Server/Backend

## image-api

API 서버. AWS Lambda, S3에서 동작함

사용 방법:

POST https://i2b5hf1h8k.execute-api.ap-northeast-2.amazonaws.com/api/image

x-api-key에 발급 된 API 키를 넣고, body에 base64로 인코딩된 이미지를 보낸다.

결과:

성공 시:

```json
{
  "success": true,
  "url": "https://..."
}
```

실패 시:

```json
{
  "success": false,
  "message": "실패 메세지"
}
```
