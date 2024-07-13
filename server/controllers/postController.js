import postModel from '../models/postModel.mjs';

import { APIfeatures } from '../lib/features.js';

const postController ={
  getPosts: async (req,res) =>{
    try{
      let features = new APIfeatures(postModel.find(), req.query)
        // .paginating()
        .sorting()
        .search()
        .filtering();

      const allPosts = await features.query;

      res.status(200).json(allPosts);
    }
    catch(err){
      res.status(500).json(err.message);
    }
  },
  getPost: async (req,res) =>{
    try {
      const post = await postModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  addPost: async (req, res) => {
    try {
      const newPost = await postModel(req.body);
      const savePost = await newPost.save();
      res.status(200).json(savePost);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  updatePost: async (req, res) => {
    try {
      const post = await postModel.findById(req.params.id);
      await post.updateOne({ $set: req.body });
      const updatedPost = await postModel.findById(req.params.id);
      res.status(200).json({
        message: 'Updated successfully!',
        data: updatedPost,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await postModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Deleted successfully!');
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

export default postController;