import { Controller, Get, Post, ValidationPipe, Query } from '@nestjs/common';
import { GetTestingList } from './dto/testing.dto';
import { TestingService } from './testing.service';

@Controller('/api/testing')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

  @Get('/list')
  async getTestingList(
    @Query(new ValidationPipe({ transform: true }))
    { page = 1, size = 10, type }: GetTestingList,
  ) {
    return this.testingService.getTestingList(page, size, type);
  }

  @Post('/add')
  async addTesting() {
    return 'success';
  }
}
