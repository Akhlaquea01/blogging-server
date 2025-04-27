import { Request, Response, NextFunction } from 'express';
import { uploadToCloudinary } from '../config/cloudinary';

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
        data: null
      });
    }

    const result = await uploadToCloudinary(req.file);

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: result.secure_url,
        public_id: result.public_id
      }
    });
  } catch (error) {
    next(error);
  }
}; 