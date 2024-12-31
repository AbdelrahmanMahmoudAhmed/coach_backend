module.exports = {
  apps: [{
    name: "hmaserv-website",
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: './', // Ensures the process runs in the correct working directory
    instances: "max",
    exec_mode: "cluster",
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
      PORT: 3028,
    }
  }]
};
