import mongoose from 'mongoose';
import Account from './accountModel.mjs';

const notifySchema = new mongoose.Schema({
  idAccount:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Account,
  },
  contentNotify:{
    type: String,
    required: true,
  },
  notifyAt:{
    type: Date,
    required: true,
  },
  linkNotify:{
    type: String,
    required: true,
  },
  isSeen:{
    type: Boolean,
    required: true,
  },
  idLink:{
    type: String, 
    required: true,
  }
},
{
  collection: 'notify',
},
{
  versionKey: false
});

let Notify = mongoose.model('Notify', notifySchema);

export default Notify;