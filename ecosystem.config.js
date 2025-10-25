module.exports = {
  apps: [
    {
      name: "liga-proba",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 8124",
      cwd: "./",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};