import mongoose from 'mongoose';

const typeAccountSchema = new mongoose.Schema({
  idTypeAccount:{
    type: Number,
    required: true
  },
  nameTypeAccount:{
    type: String,
    required: true
  }
}, 
{ 
  collection: 'typeAccount' 
}, 
{
  versionKey: false // loại bỏ __v khỏi các tài liệu
})


let TypeAccount = mongoose.model('TypeAccount', typeAccountSchema);

export default TypeAccount;