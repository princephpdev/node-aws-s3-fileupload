const AWS = require('aws-sdk');
const mime = require('mime-types');
const endpoint = new AWS.Endpoint(S3_ENDPOINT);

const S3 = new AWS.S3({
	endpoint: endpoint,
	accessKeyId: S3_KEY,
	secretAccessKey: S3_SECRET,
	maxRetries: 10
});

const stream = fs.createReadStream(filePath);
const contentType = mime.lookup(filePath)

const params = {
	Bucket: BUCKET_NAME,
	Key: OBJECT_KEY,
	Body: stream,
	ACL: 'public-read',
	ContentType: contentType
};

const options = {
	partSize: 10 * 1024 * 1024,
        // how many concurrent uploads
	queueSize: 5
};

try {
	await S3.upload(params, options).promise();
	console.log('upload OK', filePath);
} catch (error) {
	console.log('upload ERROR', filePath, error);
}