const config = {
  development: {
    api_endpoint: 'http://localhost:3000/api/v1',
  },
  staging: {
    api_endpoint: 'http://18.136.207.28/api/v1',
  },
};
const app = config[process.env.REACT_APP_ENV || 'development'];
export default app;
