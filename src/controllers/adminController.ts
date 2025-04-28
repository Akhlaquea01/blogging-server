import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import { AuthenticatedRequest } from 'custom';

export const registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
        data: null
      });
    }

    const admin = await Admin.create({ email, password, name });
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: { admin, token }
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        data: null
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        data: null
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: { admin, token }
    });
  } catch (error) {
    next(error);
  }
}; 

export const getAdminProfile = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: req.admin
    });
  } catch (error) {
    next(error);
  }
};