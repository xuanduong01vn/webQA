import express from 'express';
import notifyController from '../controllers/notifyController.js';

const notifyRouter = express.Router();

notifyRouter.get('/',notifyController.getAllNotify);
notifyRouter.get('/:id',notifyController.getNotify);
notifyRouter.post('/',notifyController.addNotify);
notifyRouter.put('/:id',notifyController.updateNotify);
notifyRouter.delete('/:id', notifyController.deleteNotify);

export default notifyRouter;
