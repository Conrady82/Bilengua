exports.handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allows requests from any origin
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({ message: "Hello, I am lambda_database_ops" }),
  };
};
