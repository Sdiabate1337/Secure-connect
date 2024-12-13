export default {
    guard: 'api',
    api: {
      driver: 'jwt',
      jwt: {
        secret: process.env.JWT_SECRET,
        options: {
          expiresIn: '1h',
        },
      },
    },
  }
  