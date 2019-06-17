const env = process.env.NODE_ENV;

// const developmentBaseUrl = {
//   baseUrl: 'http://172.16.6.39'
// };

// const productionBaseUrl = {
//   baseUrl: 'http://172.16.6.39'
// };

// const testBaseUrl = {
//   baseUrl: 'http://172.16.6.39'
// };

const config: any = {
  development: {
    baseUrl: 'http://127.0.0.1'
  },

  production: {
    baseUrl: 'http://172.16.6.39'
  },

  test: {
    baseUrl: 'http://172.16.6.39'
  }
};

export default config[env];
