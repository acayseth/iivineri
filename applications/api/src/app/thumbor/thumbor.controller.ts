import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ThumborService } from "./thumbor.service";
import { CreateThumborDto } from "./dto/create-thumbor.dto";

@ApiTags("thumbor")
@Controller("images")
export class ThumborController {
  constructor(private readonly thumborService: ThumborService) {}

  @Post("upload")
  create(@Body() createThumborDto: CreateThumborDto) {
    return this.thumborService.create(createThumborDto);
  }

  @Get(":id/:uid")
  findOne(@Param("id") id: string) {
    return this.thumborService.find(+id);
  }
}
