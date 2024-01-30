import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event, context) => {
    // Placeholder logic - replace with actual ChatGPT API call logic
    console.log("Received event:", JSON.stringify(event, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "ChatGPT API Lambda invoked" }),
    };
};
