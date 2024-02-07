const fetch = require("node-fetch");
require("dotenv").config(); // Ensure you have dotenv installed to handle environment variables

exports.handler = async (event, context) => {
  // Extract the text from the event body
  const { script } = JSON.parse(event.body);

  const API_KEY = process.env.OPENAI_API_KEY; // Your OpenAI API key should be stored in an .env file
  const model = "gpt-4"; // Or any other model you intend to use
  const prompt = script; // Use the script received from the frontend
  const temperature = 0.7; // Adjust as necessary
  const max_tokens = 150; // Adjust as necessary

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        temperature,
        max_tokens,
        n: 1,
        stream: true,
        logprobs: true, // Request log probabilities to process confidence
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.json();
    const outputText = content.choices[0].text;
    console.log(outputText);
    // Process the log probabilities here as needed before sending to the frontend
    // This part will need to be adapted based on how you plan to use the log probabilities

    return {
      statusCode: 200,
      body: JSON.stringify({ message: outputText }),
    };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to call OpenAI API" }),
    };
  }
};
