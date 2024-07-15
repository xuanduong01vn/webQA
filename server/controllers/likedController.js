import accountModel from '../models/accountModel.mjs';
import likedModel from '../models/likedModel.mjs';
import { APIfeatures } from '../lib/features.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const likedController ={
  getAllLiked: async(req, res)=>{
    try {
      let features= new APIfeatures(likedModel.find(), req.query)
        .sorting()
        .search()
        .filtering();
      const allLiked = await features.query;
      res.status(200).json(allLiked);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  getLiked: async (req,res) =>{
    try {
      const liked = await likedModel.findById(req.params.id);
      res.status(200).json(liked);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  addLiked: async (req, res) => {
    try {
      const newLiked = await likedModel(req.body);
      const saveLiked = await newLiked.save();
      res.status(200).json(saveLiked);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  updateLiked: async (req, res) => {
    try {
      const liked = await likedModel.findById(req.params.id);
      await liked.updateOne({ $set: req.body });
      const updatedLike = await likedModel.findById(req.params.id);
      res.status(200).json({
        message: 'Updated successfully!',
        data: updatedLike,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

export default likedController;