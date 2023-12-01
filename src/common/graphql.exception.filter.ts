import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const code = exception.getStatus();
    const msg = exception.message;

    if (code === 404) {
      if (msg.includes('item')) {
        msg === 'item'
          ? (exception.message = `There is no ${msg} by ID's. Please try again to find ${msg} by another ID.`)
          : (exception.message = `There is no ${msg}. Please try again to find by another ID.`);
      } else {
        exception.message = `There is no ${msg} by ID. Please try again to find ${msg} by another ID.`;
      }
    }
  }
}
