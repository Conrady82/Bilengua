const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx", // Adjust the entry file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash].[ext]', // Configure the file naming convention
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"), // Path to your index.html
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    proxy: {
      "/api/chatgpt": {
        target:
          "http://lambda_chatgpt_api:8080/2015-03-31/functions/function/invocations",
        pathRewrite: { "^/api/chatgpt": "" },
        changeOrigin: true,
        logLevel: "debug",
      },
      "/api/database": {
        target:
          "http://lambda_database_ops:8080/2015-03-31/functions/function/invocations",
        pathRewrite: { "^/api/database": "" },
        changeOrigin: true,
        logLevel: "debug",
      },
    },
    host: "0.0.0.0", // Listen on all network interfaces
    port: 3000, // Port 3000
    hot: true,
    watchFiles: {
      paths: ["src/**/*", "public/**/*"],
      options: {
        usePolling: true,
        interval: 1000, // Check for changes every second
      },
    },
  },
};
