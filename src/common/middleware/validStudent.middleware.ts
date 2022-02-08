import {
  HttpException,
  Injectable,
  NestMiddleware,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { students } from 'src/db';

@Injectable()
export class ValidStudentMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const studentId = req.params.studentId;
    const studentExists = students.some((st) => st.id === studentId);
    if (studentExists) return next();
    throw new HttpException('Student not found', 400);
  }
}
