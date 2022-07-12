const EventBridge = require('aws-sdk/clients/eventbridge');
const eventBridgeClient = new EventBridge();

exports.handler = async (event) => {
  const traceId = event.Records[0].dynamodb.NewImage._traceId.S;
  await eventBridgeClient.putEvents({
    Entries: [
      {
        Source: "service-b",
        DetailType: "DynamoDbTrigger",
        Detail: JSON.stringify(event.Records[0].dynamodb.NewImage),
        TraceHeader: traceId,
        EventBusName: "custom"
      }]
  }).promise();
}