import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getPostBySlug,
    updatePostBySlug,
    deletePostBySlug,
} from "../controllers/postController";

const router = Router();

// Create a new post
router.post("/", createPost);

// Get all posts
router.get("/", getAllPosts);

// Get a single post by slug
router.get("/:slug", getPostBySlug);

// Update a post by slug
router.put("/:slug", updatePostBySlug);

// Delete a post by slug
router.delete("/:slug", deletePostBySlug);

export default router;
