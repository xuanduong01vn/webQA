import mongoose from 'mongoose';
import Account from './accountModel.mjs';

const likedSchema = new mongoose.Schema({
  idUser:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Account,
  },
  likedList:{
    type: Array,
  }
},
{
  collection: 'liked',
},
{
  versionKey: false
});

let Liked = mongoose.model('Liked', likedSchema);

export default Liked;