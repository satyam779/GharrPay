module.exports = {
  apps: [
    {
      name: "gharrpay",
      script: "backend/index.js",
      cwd: __dirname + "/..",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "300M",
      out_file: "/var/log/gharrpay/out.log",
      error_file: "/var/log/gharrpay/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
