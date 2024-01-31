# Define custom function directory
ARG FUNCTION_DIR="/lambda_chatgpt_api"

# Stage 1: Build stage using Node.js 18
FROM node:18-buster as build-image

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Install aws-lambda-cpp build dependencies
RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev

# Copy function code
RUN mkdir -p ${FUNCTION_DIR}
COPY ./* ${FUNCTION_DIR}

WORKDIR ${FUNCTION_DIR}

# Install dependencies
RUN npm install

# Stage 2: Create a slim image for runtime
FROM node:18-buster-slim

# Set environment variable for npm cache
ENV NPM_CONFIG_CACHE=/tmp/.npm

# Include global arg in this stage of the build
ARG FUNCTION_DIR

# Set working directory to function root directory
WORKDIR ${FUNCTION_DIR}

# Copy in the built dependencies from the build stage
COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
CMD ["handler.handler"]
