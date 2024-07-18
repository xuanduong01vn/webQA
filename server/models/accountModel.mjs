import mongoose from 'mongoose';
import TypeAccount from './typeAccountModel.mjs';

const accountSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  fullname:{
    type: String,
  },
  idTypeAccount:{
    type: mongoose.Schema.Types.Number,
    ref: TypeAccount,
  },
  birthday:{
    type: Date,
  },
  createAt:{
    type: Date,
  },
  avatar:{
    type: String,
  },
  email:{
    type: String,
  },
  listLiked:{
    type: Array,
  },
  listMarked:{
    type: Array,
  },
  newNotify:{
    type: Number,
    required: true,
  },
  isDeleted:{
    type: Boolean,
  },
}, 
{
  versionKey: false // loại bỏ __v khỏi các tài liệu
});

let Account = mongoose.model('Account', accountSchema);

export default Account;