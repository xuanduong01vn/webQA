import accountModel from '../models/accountModel.mjs';
import { APIfeatures } from '../lib/features.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const accountController ={
  getAccounts: async (req,res) =>{
    try{
      let features = new APIfeatures(accountModel.find(), req.query)
        .sorting()
        .search()
        .filtering();
      const allAccounts = await features.query;
      res.status(200).json(allAccounts);
    }
    catch(err){
      res.status(500).json(err.message);
    }
  },
  getAccount: async (req,res) =>{
    try {
      const acc = await accountModel.findById(req.params.id);
      res.status(200).json(acc);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  addAccount: async (req, res) => {
    try {
      const { username, password, email } = req.body;

      if (!password || !email || !username || username.trim().length==0 || email.trim().length==0 || password.trim().length==0) {
        return res.status(400).json('Username and password are required');
      }

      const newAccount = await accountModel(req.body);
      const usernameAccount = await accountModel.findOne({username});
      const emailAccount = await accountModel.findOne({email});
      

      if(usernameAccount && username.trim().length>0){
        res.status(200).json('Tên tài khoản đã tồn tại');
      }
      else if(emailAccount && email.trim().length>0){
        res.status(200).json('Email đã tồn tại');
      }
      else{
        const saveAccount = await newAccount.save();
        res.status(200).json(saveAccount);
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  updateAccount: async (req, res) => {
    try {
      const account = await accountModel.findById(req.params.id);
      await account.updateOne({ $set: req.body });
      const updatedAccount = await accountModel.findById(req.params.id);
      res.status(200).json({
        message: 'Updated successfully!',
        data: updatedAccount,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const account = await accountModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Deleted successfully!');
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};

export default accountController;