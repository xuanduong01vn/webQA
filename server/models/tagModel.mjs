import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  nameTag:{
    type: String,
    required: true
  },
  createAt:{
    type: Date,
    required: true
  },
  isDeleted:{
    type: Boolean,
    required: true
  },
}, 
{
  versionKey: false // loại bỏ __v khỏi các tài liệu
})


let Tag = mongoose.model('Tag', tagSchema);

export default Tag;