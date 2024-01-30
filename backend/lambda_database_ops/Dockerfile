# Use the AWS Lambda Node.js base image
FROM public.ecr.aws/lambda/nodejs:latest

# Copy function code and package.json to the container
COPY lambda_database_ops/package*.json lambda_database_ops/

# Install dependencies
RUN npm install --prefix lambda_database_ops

# Copy the rest of the function code
COPY . lambda_database_ops/

# Specify the name of your Lambda handler file (e.g., handler.ts)
ENV AWS_LAMBDA_FUNCTION_HANDLER=handler.ts

# Specify the name of your Lambda function (e.g., lambda_chatgpt_api)
ENV AWS_LAMBDA_FUNCTION_NAME=lambda_database_ops

# Expose port 9000 (default for Lambda Runtime API)
EXPOSE 9000

# Set the CMD to your handler
CMD ["npm", "run", "start-runtime"]
