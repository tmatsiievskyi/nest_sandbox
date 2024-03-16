import { HttpException, HttpStatus } from '@nestjs/common';

class PostNotFountException extends HttpException {
  constructor(postId: number) {
    super(`Post with id ${postId} not found`, HttpStatus.NOT_FOUND);
  }
}

export default PostNotFountException;
