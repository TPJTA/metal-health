import { Controller, Get, Post, ValidationPipe, Query } from '@nestjs/common';
import { GetTestingListDTO, GetTestingDTO } from './dto/testing.dto';
import { TestingService } from './testing.service';

@Controller('/api/testing')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

  @Get('')
  getTesting(
    @Query(new ValidationPipe({ transform: true }))
    { id }: GetTestingDTO,
  ) {
    return this.testingService.getTesting(id);
  }

  @Get('/question')
  getTestingQuestion(
    @Query(new ValidationPipe({ transform: true }))
    { id }: GetTestingDTO,
  ) {
    return this.testingService.getTestingQuestion(id);
  }

  @Get('/list')
  async getTestingList(
    @Query(new ValidationPipe({ transform: true }))
    { page = 1, size = 10, type }: GetTestingListDTO,
  ) {
    return this.testingService.getTestingList(page, size, type);
  }

  @Post('/add')
  async addTesting() {
    return 'success';
  }
}
