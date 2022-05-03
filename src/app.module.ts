import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, { provide: 'key', useValue: '나야' }],
})
export class AppModule implements NestModule {
  //middleware는 컨슈머에 연결한다.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // 모든 라우터에 적용한다.
  }
}
