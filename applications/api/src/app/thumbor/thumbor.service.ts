import { Injectable } from "@nestjs/common";
import { CreateThumborDto } from "./dto/create-thumbor.dto";

@Injectable()
export class ThumborService {
  create(createThumborDto: CreateThumborDto) {
    return `This action adds a new thumbor: ${createThumborDto}`;
  }

  find(id: number) {
    return `This action returns a #${id} thumbor`;
  }

  remove(id: number) {
    return `This action removes a #${id} thumbor`;
  }
}
