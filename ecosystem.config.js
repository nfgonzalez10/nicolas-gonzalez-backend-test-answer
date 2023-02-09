module.exports = {
  apps: [
    {
      name: "http-service",
      script: "./src/app.js",
      watch: true,
      node_args: "--inspect",
    },
  ],
};
