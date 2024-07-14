import express from 'express';
import markedController from '../controllers/markedController.js';

const markedRouter = express.Router();

markedRouter.get('/',markedController.getAllMarked);
markedRouter.get('/:id',markedController.getMarked);
markedRouter.post('/',markedController.addMarked);
markedRouter.put('/:id',markedController.updateMarked);

export default markedRouter;
