import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  Query,
  Body,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  GetTestingListDTO,
  GetTestingDTO,
  GetTestingResultDTO,
  AddTestingDTO,
  AddQuestionDTO,
  UpdateTestingtDTO,
} from './dto/testing.dto';
import { TestingService } from './testing.service';
import { AnalyseTracking } from '../analyse/analyseTracking.interceptor';

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
  @UseInterceptors(AnalyseTracking('testing'))
  getTestingQuestion(
    @Query(new ValidationPipe({ transform: true }))
    { id }: GetTestingDTO,
  ) {
    return this.testingService.getTestingQuestion(id);
  }

  @Get('/result')
  getTestingResult(
    @Query(new ValidationPipe({ transform: true }))
    { id, score }: GetTestingResultDTO,
  ) {
    return this.testingService.getTestingRes(id, score);
  }

  @Get('/list')
  async getTestingList(
    @Query(new ValidationPipe({ transform: true }))
    { page, size, type }: GetTestingListDTO,
  ) {
    return this.testingService.getTestingList(page, size, type);
  }

  @Get('/allList')
  async getTestingAllList(
    @Query(new ValidationPipe({ transform: true }))
    { page, size, type }: GetTestingListDTO,
  ) {
    return this.testingService.getTestingAllList(page, size, type);
  }

  @Post()
  async addTesting(
    @Body(new ValidationPipe({ transform: true })) testing: AddTestingDTO,
  ) {
    return this.testingService.addTesting(testing);
  }

  @Delete()
  async removeTesting(
    @Body(new ValidationPipe({ transform: true }))
    { id }: GetTestingDTO,
  ) {
    return this.testingService.removeTesting(id);
  }

  @Put()
  async updateTesting(
    @Body(new ValidationPipe({ transform: true }))
    param: UpdateTestingtDTO,
  ) {
    return this.testingService.updateTesting(param);
  }

  @Post('/question')
  async addQuestion(
    @Body(new ValidationPipe({ transform: true }))
    param: AddQuestionDTO,
  ) {
    return this.testingService.addQuestion(param);
  }

  @Delete('/question')
  async removeQuestion(
    @Body(new ValidationPipe({ transform: true }))
    { id }: GetTestingDTO,
  ) {
    return this.testingService.removeQuestion(id);
  }
}
