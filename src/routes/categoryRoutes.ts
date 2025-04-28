import { Router } from "express";
import { createCategory, getCategories, getCategoryBySlug, deleteCategory } from "../controllers/categoryController";

const router = Router();

// Create new category
router.post("/", createCategory);

// Get all categories
router.get("/", getCategories);

// Get single category by slug
router.get("/:slug", getCategoryBySlug);

// Delete a category by slug
router.delete("/:slug", deleteCategory);

export default router;
