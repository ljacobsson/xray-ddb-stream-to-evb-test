const axios = require("axios").default;
const AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('http'));
AWSXRay.captureHTTPsGlobal(require('https'));

exports.handler = async function (event, context) {
  await axios.put("https://syt2qk0pi7.execute-api.eu-west-1.amazonaws.com/Prod/item", { test: 123 });
  return {
    statusCode: 200,
    body: "ok"
  }
};
