import { Request, Response } from "express";
import { PostModel } from "../models/Post";

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      category, // expecting categoryId
      tags,
      thumbnailUrl,
      highlightDescription,
      content,
      htmlContent,
      isPublished,
      publishedAt,
      createdBy,
    } = req.body;

    const newPost = await PostModel.create({
      title,
      slug,
      category,
      tags,
      thumbnailUrl,
      highlightDescription,
      content,
      htmlContent,
      isPublished,
      publishedAt,
      createdBy,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post", details: error });
  }
};

// Get all posts with filtering
// /api/posts?category=tech&tag=javascript&search=react&isPublished=true&sortBy=createdAt&sortOrder=desc&page=1&limit=10
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      tag,
      search,
      isPublished,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build filter query
    const filter: any = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (tag) {
      filter.tags = { $in: [tag] };
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (isPublished !== undefined) {
      filter.isPublished = isPublished === 'true';
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Get total count for pagination
    const total = await PostModel.countDocuments(filter);

    // Get posts with filters
    const posts = await PostModel.find(filter)
      .populate("category", "name slug")
      .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      posts,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts", details: error });
  }
};

// Get single post by slug
export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await PostModel.findOne({ slug }).populate("category", "name slug");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post", details: error });
  }
};

// Update a post by slug
export const updatePostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const updatedData = req.body;

    const updatedPost = await PostModel.findOneAndUpdate({ slug }, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post", details: error });
  }
};

// Delete a post by slug
export const deletePostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const deletedPost = await PostModel.findOneAndDelete({ slug });

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post", details: error });
  }
};
