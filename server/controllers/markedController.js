import accountModel from '../models/accountModel.mjs';
import markedModel from '../models/markedModel.mjs';
import { APIfeatures } from '../lib/features.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const markedController ={
  getAllMarked: async(req, res)=>{
    try {
      let features= new APIfeatures(markedModel.find(), req.query)
        .sorting()
        .search()
        .filtering();
      const allMarked = await features.query;
      res.status(200).json(allMarked);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  getMarked: async (req,res) =>{
    try {
      const marked = await markedModel.findById(req.params.id);
      res.status(200).json(marked);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  addMarked: async (req, res) => {
    try {
      const newMarked = await markedModel(req.body);
      const saveMarked = await newMarked.save();
      res.status(200).json(saveMarked);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  updateMarked: async (req, res) => {
    try {
      const marked = await markedModel.findById(req.params.id);
      await marked.updateOne({ $set: req.body });
      const updatedMark = await markedModel.findById(req.params.id);
      res.status(200).json({
        message: 'Updated successfully!',
        data: updatedMark,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

export default markedController;