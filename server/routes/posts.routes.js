import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getPosts,
  updatePost,
  createPost,
  deletePost,
  getPost,
} from "../controllers/posts.controllers.js";
const router = Router();

router.get("/posts", authRequired, getPosts);
router.post("/posts", authRequired, createPost);
router.put("/posts/:id", authRequired, updatePost);
router.delete("/posts/:id", authRequired, deletePost);
router.get("/posts/:id", authRequired, getPost);

export default router;
