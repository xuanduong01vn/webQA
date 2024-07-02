import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let filePath;
    if(file.fieldname =='avatar'){
      filePath='images/avatars';
    }
    else if(file.fieldname =='post'){
      filePath='images/posts';
    }
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage});

const fileController={
  uploadAvatar: async(req, res) => {
    const fileUrl = `http://localhost:9999/file/avatar/${req.file.filename}`;
    res.status(200).json({ message: 'Avatar uploaded successfully', file: req.file, fileUrl });
  },

  uploadPosts: async (req, res) => {
    const fileUrls = req.files.map(file => ({
      originalname: file.originalname,
      fileUrl: `http://localhost:9999/file/post/${file.filename}`,
    }));
    res.status(200).json({ message: 'Posts uploaded successfully', files: req.files, fileUrls });
  },
}

export {fileController, upload};