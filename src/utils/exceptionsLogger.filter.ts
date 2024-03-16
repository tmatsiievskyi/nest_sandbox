import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
class ExceptionLoggerFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    console.log('Exception thrown', exception);
    super.catch(exception, host);
  }
}

export default ExceptionLoggerFilter;
