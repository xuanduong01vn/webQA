import {fileController, upload} from '../controllers/fileController.js';
import express from 'express';

const fileRouter = express.Router();

fileRouter.post('/upload-avatar', upload.single('avatar'), fileController.uploadAvatar);
fileRouter.post('/upload-post', upload.array('post', 20), fileController.uploadPosts);

export default fileRouter;