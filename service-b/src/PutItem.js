var AWSXRay = require('aws-xray-sdk');
var AWS = AWSXRay.captureAWS(require('aws-sdk'));

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
  console.log(event);
  await dynamoDbClient.put({
    TableName: process.env.TABLE_NAME,
    Item: {
      id: Math.random().toString(),
      _traceId: process.env["_X_AMZN_TRACE_ID"],
    }
  }).promise();
  return {
    statusCode: 200,
    body: "ok"
  }
};
