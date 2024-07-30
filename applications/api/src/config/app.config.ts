export type NODE_ENV = "production" | "development";

export default () => ({
  node_env: process.env.NODE_ENV as NODE_ENV,
  port: parseInt(process.env.PORT as string, 10) || 4000
});
