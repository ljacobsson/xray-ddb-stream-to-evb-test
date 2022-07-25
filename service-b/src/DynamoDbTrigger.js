const EventBridge = require('aws-sdk/clients/eventbridge');
const eventBridgeClient = new EventBridge();

exports.handler = async (event) => {
  process.env._X_AMZN_TRACE_ID = event.Records[0].dynamodb.NewImage._traceId.S;
  for (const record of event.Records) {
    const traceId = record.dynamodb.NewImage._traceId.S;
    
    await eventBridgeClient.putEvents({
      Entries: [
        {
          Source: "service-b",
          DetailType: "DynamoDbTrigger",
          Detail: JSON.stringify(record.dynamodb.NewImage),
          TraceHeader: traceId,
          EventBusName: "custom"
        }]
    }).promise();
  }
}