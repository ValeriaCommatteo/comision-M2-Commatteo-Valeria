import { Router } from "express";
import { tokenAuth } from "../middlewares/auth.js";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../controllers/postController.js";
import { validateSchema } from "../middlewares/verification.js";
import { createPostSchema } from "../schemas/postSchema.js";

const router = Router();

router.get("/posts", getPosts)
router.get("/post/:id", getPost)
router.post("/post", tokenAuth, validateSchema(createPostSchema), createPost)
router.delete("/post/:id", tokenAuth, deletePost)
router.put("/post/:id", tokenAuth, updatePost)

export default router;