import { Document } from 'mongoose';
import { IAdmin } from '../models/Admin';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  admin?: IAdmin & Document;
  file?: Express.Multer.File;
}

declare module 'express-serve-static-core' {
  interface Request {
    admin?: IAdmin & Document;
    file?: Express.Multer.File;
  }
} 