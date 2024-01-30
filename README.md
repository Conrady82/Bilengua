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

### Adjusting Polling for File Watching

- The development server is configured to use file watching to automatically reload the application when code changes are detected. In some environments, especially when using Docker on Windows or Mac, you may need to enable polling to ensure file changes are detected.

- If you experience high CPU usage or performance issues, you can adjust the polling interval in the `webpack.config.js` file under the `devServer.watchOptions` section. The default is set to check for changes every 1000 milliseconds (1 second). Increasing this interval can reduce resource usage.

  ```javascript
  watchOptions: {
    poll: 2000, // Adjust polling interval (in milliseconds)
  },


## Contribution Guidelines
(Outline how team members can contribute to the project, including coding standards, branch naming conventions, etc.)

## License
(Include project license information here)
