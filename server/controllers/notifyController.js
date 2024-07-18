import notifyModel from '../models/notifyModel.mjs';

import { APIfeatures } from '../lib/features.js';

const notifyController ={
  getAllNotify: async (req,res) =>{
    try{
      let features = new APIfeatures(notifyModel.find(), req.query)
        // .paginating()
        .sorting()
        .search()
        .filtering();

      const allNotify = await features.query;

      res.status(200).json(allNotify);
    }
    catch(err){
      res.status(500).json(err.message);
    }
  },
  getNotify: async (req,res) =>{
    try {
      const notify = await notifyModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  addNotify: async (req, res) => {
    try {
      const newNotify = await notifyModel(req.body);
      const saveNotify = await newNotify.save();
      res.status(200).json(saveNotify);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  updateNotify: async (req, res) => {
    try {
      const notify = await notifyModel.findById(req.params.id);
      await notify.updateOne({ $set: req.body });
      const updatedNotify = await notifyModel.findById(req.params.id);
      res.status(200).json({
        message: 'Updated successfully!',
        data: updatedNotify,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  deleteNotify: async (req, res) => {
    try {
      const post = await notifyModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Deleted successfully!');
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

export default notifyController;