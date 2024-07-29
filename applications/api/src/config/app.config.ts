export type NODE_ENV = "production" | "development";

export default () => ({
  node_env: process.env.NODE_ENV as NODE_ENV,
});
