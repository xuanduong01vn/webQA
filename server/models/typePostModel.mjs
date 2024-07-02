import mongoose from 'mongoose';

const typePostSchema = new mongoose.Schema({
  idTypePost:{
    type: Number,
    required: true
  },
  nameTypePost:{
    type: String,
    required: true
  }
}, 
{ collection: 'typePost' }, 
{
  versionKey: false // loại bỏ __v khỏi các tài liệu
});


let TypePost = mongoose.model('TypePost', typePostSchema);

export default TypePost;

