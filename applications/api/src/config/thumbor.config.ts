export default () => ({
  host: process.env.THUMBOR_URL as string,
  token: process.env.THUMBOR_TOKEN as string,
});
