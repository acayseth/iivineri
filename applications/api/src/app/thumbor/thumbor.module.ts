import { Module } from "@nestjs/common";
import { ThumborService } from "./thumbor.service";
import { ThumborController } from "./thumbor.controller";

@Module({
  controllers: [ThumborController],
  providers: [ThumborService],
})
export class ThumborModule {}
