import { Request, Response } from "express";
import { CategoryModel } from "../models/Category";

// Create new category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, slug, description } = req.body;
        const category = await CategoryModel.create({ name, slug, description });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to create category", details: error });
    }
};

// Get all categories
export const getCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories", details: error });
    }
};

// Get single category by slug
export const getCategoryBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const category = await CategoryModel.findOne({ slug });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch category", details: error });
    }
};

// Delete category by slug
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const deletedCategory = await CategoryModel.findOneAndDelete({ slug });
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete category", details: error });
    }
};
