module.exports = {
  apps: [
    {
      name: 'swiftship-nuxt',
      script: 'npm',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'run start',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: '157.230.151.241',
      ref: 'origin/master',
      repo: 'git@gitlab.com:swiftship/nuxt.git',
      path: '/home/deploy/swiftship-nuxt',
      'post-deploy':
        'ls -la && cp -f ./../shared/.env .' +
        ' && npm install' +
        ' && npm run build' +
        ' && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
