const config = {
  development: {
    api_endpoint: 'http://localhost:3000/api/v1',
  },
  staging: {
    api_endpoint: 'http://nimble.tednguyen.me/api/v1',
  },
};
const app = config[process.env.REACT_APP_ENV || 'development'];
export default app;
