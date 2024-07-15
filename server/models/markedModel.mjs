import mongoose from 'mongoose';
import Account from './accountModel.mjs';

const markedSchema = new mongoose.Schema({
  idAccount:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Account,
  },
  markedList:{
    type: Array,
  }
},
{
  collection: 'marked'
},
{
  versionKey: false
});

let Marked = mongoose.model('Marked', markedSchema);

export default Marked;