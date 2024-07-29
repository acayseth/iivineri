import * as Joi from "joi";

import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";

import { ThumborModule } from "@/app/thumbor/thumbor.module";

import configuration from "@/config";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [".env", ".env.local"],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production")
          .default("development"),
        THUMBOR_HOST: Joi.required(),
        THUMBOR_TOKEN: Joi.required(),
      }),
    }),
    ThumborModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
