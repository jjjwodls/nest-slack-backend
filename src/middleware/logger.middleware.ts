import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//해당 방법과 사용 할 수 있지만 NEST MORGAN 을 적용하여 사용한다.(실무에서는)
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  //원래는 Logger.log 를 많이 사용하는데 컨텍스트로 로그를 구분하기 위해 사용한다.
  private logger = new Logger('HTTP'); //HTTP context를 적용하여 추적을 쉽게 하기위해 사용한다.

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      //해당 미들웨어는 라우팅 하기 전에 수행을 하므로 on이 먼저 수행되고 라우트 실행 후 finish로 수행된다.
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${ip} ${originalUrl} ${userAgent} ${statusCode} ${contentLength}`,
      );
    });

    next();
  }
}
