import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getPostBySlug,
    updatePostBySlug,
    deletePostBySlug,
} from "../controllers/postController";
import { adminAuth } from "../middlewares/authMiddleware";

const router = Router();

// Create a new post (admin only)
router.post("/", adminAuth, createPost);

// Get all posts (public)
router.get("/", getAllPosts);

// Get a single post by slug (public)
router.get("/:slug", getPostBySlug);

// Update a post by slug (admin only)
router.put("/:slug", adminAuth, updatePostBySlug);

// Delete a post by slug (admin only)
router.delete("/:slug", adminAuth, deletePostBySlug);

export default router;
