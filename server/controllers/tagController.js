import TagModel from '../models/tagModel.mjs';
import { APIfeatures } from '../lib/features.js';

const tagController ={
  getAllTags: async(req,res) =>{
    try {
      let features= new APIfeatures(TagModel.find(), req.query)
        .sorting()
        .search()
        .filtering()
        // .paginating();
      const allTags = await features.query;
      res.status(200).json(allTags);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  addTag: async(req,res)=>{
    try {
      const newTag = await TagModel(req.body);
      const saveTag = await newTag.save();
      res.status(200).json(saveTag);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  
};

export default tagController;
