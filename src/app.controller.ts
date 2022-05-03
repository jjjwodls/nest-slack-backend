import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('key') private readonly test,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.test);
    return this.appService.getHello();
  }
}
