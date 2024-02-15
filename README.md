# Bilengua Translation Service

## Overview
Bilengua is a translation service leveraging modern web technologies to provide seamless language translation experiences.

## Project Structure

### Frontend
- `/frontend`: Contains all front-end code, built with React.
  - `/src`: Main source code directory.
    - `/components`: React components.
    - `/pages`: Page components.
    - `/utils`: Utility functions.
  - `/public`: Public assets like images and `index.html`.
  - `/tests`: Tests for the front-end code.
  - `package.json`: NPM package file.
  - `Dockerfile`: Docker configuration for the front end.

### Backend
- `/lambda_chatgpt_api`: Handles interactions with the ChatGPT API.
  - `src/handler.ts`: Processes requests, communicates with ChatGPT API, formats responses.

- `/lambda_database_ops`: Manages database operations.
  - `src/handler.ts`: Handles database interactions, user session management, token refreshes.

### Database
- `/database`: Contains database-related scripts.
  - `/migrations`: Database migration scripts.
  - `/seeds`: Database seed scripts.

### Root Directory
- `docker-compose.yml`: Docker Compose configuration.
- `.gitignore`: Specifies intentionally untracked files to ignore.
- `README.md`: Project documentation.

## Getting Started

## Front-End Development Environment Setup

### Prerequisites

- Ensure Docker is installed on your machine. If you're using Windows or Mac, Docker Desktop should be installed and running. [Download Docker Desktop](https://www.docker.com/products/docker-desktop).
- Node.js and npm should be installed for initial setup and running scripts outside of Docker.

### Running the Front-End Container

1. **Start Docker Desktop**:
   - Before running the container, make sure the Docker Desktop application is running. This is essential as it manages the Docker daemon needed to build and run Docker containers.

2. **Build the Docker Image**:
   - Navigate to the `frontend` directory of the project.
   - Build the Docker image using the following command:
     ```bash
     docker build -t bilengua-frontend .
     ```

3. **Run the Container with Volume Mounting**:
   - To start the development server with Hot Module Replacement (HMR) and ensure your code changes are reflected in real-time, run the following command:
     ```bash
     docker run -p 3000:3000 -v $(pwd):/app bilengua-frontend
     ```
   - This command maps your local frontend directory to the container and forwards port 3000, enabling you to access the application at `http://localhost:3000`.

4. **Stop the Container with Volume Mounting**:
   - To stop the development run the following command:
     ```bash
     docker ps
     ```
   - This command lists your docker containers that are running, you will see first listed an id number, copy this number and then paste it in for dockerid in the following command:
   ```bash
     docker stop dockerid
     ```

### Adjusting Polling for File Watching

- The development server is configured to use file watching to automatically reload the application when code changes are detected. In some environments, especially when using Docker on Windows or Mac, you may need to enable polling to ensure file changes are detected.

- If you experience high CPU usage or performance issues, you can adjust the polling interval in the `webpack.config.js` file under the `devServer.watchOptions` section. The default is set to check for changes every 1000 milliseconds (1 second). Increasing this interval can reduce resource usage.

  ```javascript
  watchOptions: {
    poll: 2000, // Adjust polling interval (in milliseconds)
  },

## Back-End Development Environment Setup
# AWS Lambda Local Development Setup Guide

This guide outlines the steps for setting up and testing the `lambda_chatgpt_api` and `lambda_database_ops` Lambda functions locally.

## Prerequisites

- Docker installed on your machine.
- Node.js and npm installed on your machine.

## Setup Instructions

### 1. Install Node Dependencies

You need to run `npm install` in both Lambda function directories.

- npm install in chatGPT Lambda folder, and install Lambda RIE, navigate back to home directory then paste
  ```bash
  cd backend/lambda_chatgpt_api
  npm install
  mkdir -p ~/.aws-lambda-rie && \
  curl -Lo ~/.aws-lambda-rie/aws-lambda-rie https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie && \
  chmod +x ~/.aws-lambda-rie/aws-lambda-rie

- Same actions for Database Lambda folder, navigate back to home directory
  ```bash
  cd path/to/backend/lambda_database_ops
  npm install
  mkdir -p ~/.aws-lambda-rie && \
  curl -Lo ~/.aws-lambda-rie/aws-lambda-rie https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie && \
  chmod +x ~/.aws-lambda-rie/aws-lambda-rie

### 2. Build Docker Images

- Navigate to the lambda_chatgpt_api/ folder and then run this command:
  ```bash
  docker build -t lambda_chatgpt_api .


- Navigate to the lambda_database_ops/ folder and then run this command:
  ```bash
  docker build -t lambda_database_ops .

### 3. Run Docker Containers

- Navigate to the lambda_chatgpt_api/ folder and then run this command:
  ```bash
  docker run -d -v ~/.aws-lambda-rie:/aws-lambda -p 9001:8080 \
    --entrypoint /aws-lambda/aws-lambda-rie \
    lambda_chatgpt_api:latest \
    /usr/local/bin/npx aws-lambda-ric handler.handler



- Navigate to the lambda_database_ops/ folder and then run this command:
  ```bash
  docker run -d -v ~/.aws-lambda-rie:/aws-lambda -p 9002:8080 \
    --entrypoint /aws-lambda/aws-lambda-rie \
    lambda_database_ops:latest \
    /usr/local/bin/npx aws-lambda-ric handler.handler

### 4. Test Lambda Functions

- Test lambda_chatgpt_api Function:
  ```bash
  curl -XPOST "http://localhost:9001/2015-03-31/functions/function/invocations" -d '{}'


- Test lambda_database_ops Function:
  ```bash
  curl -XPOST "http://localhost:9002/2015-03-31/functions/function/invocations" -d '{}'

# Development Environment Setup Guide

This guide will walk you through setting up the development environment for our project using Docker Compose.

## Prerequisites

- Ensure you have Docker, Node.js, and npm installed on your machine.

## Initial Setup

### 1. Install Node Dependencies

You need to run `npm install` in the frontend and both Lambda function directories.

- **Frontend**:
  ```bash
  cd /frontend
  npm install

- **Backend**:
- npm install in chatGPT Lambda folder, and install Lambda RIE, navigate back to home directory then paste
  ```bash
  cd backend/lambda_chatgpt_api
  npm install
  mkdir -p ~/.aws-lambda-rie && \
  curl -Lo ~/.aws-lambda-rie/aws-lambda-rie https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie && \
  chmod +x ~/.aws-lambda-rie/aws-lambda-rie

- Same actions for Database Lambda folder, navigate back to home directory
  ```bash
  cd path/to/backend/lambda_database_ops
  npm install
  mkdir -p ~/.aws-lambda-rie && \
  curl -Lo ~/.aws-lambda-rie/aws-lambda-rie https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie && \
  chmod +x ~/.aws-lambda-rie/aws-lambda-rie

### 2. Docker compose setup

- **Build and Run Docker Images**
  Before running services for the first time, bnuild the Docker images. Navigate to the home directory and then paste:
  ```bash
  docker-compose up --build

- **Future runs**
  In the future if there are no changes to the Dockerfiles or package dependencies (code changes are fine) you can directly start the services without rebuilding the images.
  Navigate to the home directory and paste in the command:
  ```bash
  docker-compose up

### 3. Docker compose teardown

- **Stop services**
  When your done, open up a new terminal and paste in the command:
  ```bash
  docker-compose down

## Contribution Guidelines
(Outline how team members can contribute to the project, including coding standards, branch naming conventions, etc.)

## License
(Include project license information here)
