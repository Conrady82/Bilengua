exports.handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, I am lambda_chatgpt_api" }),
  };
};
