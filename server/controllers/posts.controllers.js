import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {}
};

export const createPost = async (req, res) => {
  try {
    let image;
    const { title, description } = req.body;
    if (req.body.url && req.body.public_id) {
      image = {
        url: req.body.url,
        public_id: req.body.public_id,
      };
    }
    const newPost = new Post({ title, description, image });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    let image;
    if (req.body.url && req.body.public_id) {
      image = {
        url: req.body.url,
        public_id: req.body.public_id,
      };
    }
    const newPost = {
      ...req.body,
      image,
    };
    const updatePost = await Post.findByIdAndUpdate(req.params.id, newPost, {
      new: true,
    });
    return res.send(updatePost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id);
    if (!deletePost) return res.sendStatus(404);
    if (deletePost.image.public_id) {
      await deleteImage(deletePost.image.public_id);
    }
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
