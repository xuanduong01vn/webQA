import express from 'express';
import accountController from '../controllers/accountController.js';

const accountRouter = express.Router();

accountRouter.get('/',accountController.getAccounts);
accountRouter.get('/:id',accountController.getAccount);
accountRouter.post('/register', accountController.addAccount);
accountRouter.post('/login', accountController.login);
accountRouter.put('/:id',accountController.updateAccount);
accountRouter.delete('/:id',accountController.deleteAccount);

export default accountRouter;
