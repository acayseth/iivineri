import redisConfig from "@/config/redis.config";
import thumborConfig from "@/config/thumbor.config";
import appConfig from "@/config/app.config";

export default () => ({
  app: appConfig(),
  thumbor: thumborConfig(),
  redis: redisConfig(),
});
