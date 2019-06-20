const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const Bucket = "mocon-images";

process.on('uncaughtException', err => {
    console.err(err);
});
exports.handler = async (event) => {
    if (!event.body) {
        return {
            status: 400,
            body: JSON.stringify({
                success: false,
                message: "요청 바디가 없습니다."
            })
        }
    }
    const decodedImage = Buffer.from(event.body, 'base64');
    const Key = await getName();
    try {
        const data = await s3.upload({
            Body: decodedImage,
            Bucket,
            Key,
            ACL: "public-read"
        }).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({
                success: true,
                url: data.Location
            })
        };
    } catch(e) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                success: false,
                message: "서버에서 오류가 발생했습니다."
            })
        };
    }
};

async function getName(i = 0) {
    const date = new Date();
    const filename = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}${i === 0 ? "" : i}.jpg`;
    return filename;
}