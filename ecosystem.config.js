export default {
  apps: [
    {
      name: 'frontend-project-management',
      script: 'serve',
      args: ' -s dist -l 5173',
      env: {
        NODE_ENV: 'production',
      },
      instance: 1,
      error_file: './logs/pm2-err.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
