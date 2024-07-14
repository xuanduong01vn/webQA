import express from 'express';
import likedController from '../controllers/likedController.js';

const likedRouter = express.Router();

likedRouter.get('/',likedController.getAllLiked);
likedRouter.get('/:id',likedController.getLiked);
likedRouter.post('/',likedController.addLiked);
likedRouter.put('/:id',likedController.updateLiked);

export default likedRouter;
