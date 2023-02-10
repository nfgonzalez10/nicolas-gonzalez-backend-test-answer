module.exports = {
  apps: [
    {
      name: "http-service",
      script: "./src/app.js",
      watch: true,
      node_args: "--inspect",
      env: {
        ME_CONFIG_MONGODB_URL:
          "mongodb+srv://nfgonzalez10:PWDu8mrA27NuFkiW@cluster0.yjdif5h.mongodb.net/?retryWrites=true&w=majority",
      },
    },
  ],
};
