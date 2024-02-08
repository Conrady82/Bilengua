import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORGANIZATION,
});

// Updated export syntax for ES Modules
export const handler = async (event, context) => {
  const script = event.script;
  console.log("Received script:", script);

  const model = "gpt-4"; // Adjust to the model you intend to use
  const messages = [{ role: "user", content: script }];

  try {
    console.log("Making API call to OpenAI");
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      logprobs: true,
      top_logprobs: 2,
    });

    console.log("API call successful:", JSON.stringify(completion));

    // Add a check here to ensure `completion.data.choices` is not undefined
    if (!completion || !completion.choices || completion.choices.length === 0) {
      throw new Error("Unexpected response structure from OpenAI API");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: completion.choices[0].message.content,
      }),
    };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to call OpenAI API",
        details: error.message,
      }),
    };
  }
};
