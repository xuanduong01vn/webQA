import express from 'express';
import jwt from 'jsonwebtoken';
import accountModel from '../models/accountModel.mjs';

const authController={
  login: async (req, res)=> {
    try {
      const { email, password } = req.body;

      if (!password || !email || email.trim().length==0 || password.trim().length==0) {
        return res.status(400).json('Email and password are required');
      }

      // const newAccount = await accountModel(req.body);
      const userFound = await accountModel.findOne(req.body);

      if(userFound && email.trim().length>0 && password.trim().length>0){
        const token = jwt.sign({ iduser: userFound._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        // const cookieValue = JSON.stringify({ token, iduser });
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        res.cookie('iduser', userFound._id.toString());
        res.cookie('user', JSON.stringify(userFound, null, 4));
        res.status(200).json({
          message: 'Login success',
          iduser: userFound._id,
          user: userFound});
      }
      if(!userFound || email.trim().length==0 || password.trim().length==0){
        res.status(200).json({
          message:'Login failed'
        });
      }
      
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
}

export default authController;