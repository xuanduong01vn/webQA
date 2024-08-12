import React, {useEffect, useState, createContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor, Alignment } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import styled from 'styled-components';


class NewEditor extends ClassicEditor {};

NewEditor.builtinPlugins = [
  ...ClassicEditor.builtinPlugins,
  Alignment
];

NewEditor.defaultConfig = {
  toolbar: {
      items: [
        'undo', 'redo', 
        '|',
        'heading', 
        '|', 
        'bold', 'italic', 'blockQuote',
        '|', 
        'link', 'imageUpload', 'codeBlock', 'insertTable', 
        '|', 
        'bulletedList', 'numberedList', 'outdent', 'indent',
      ],
      shouldNotGroupWhenFull: true,
  },
  alignment: {
      options: [ 'left', 'center', 'right', 'justify' ]
  },
  // table: {
  //     contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
  // },
  language: 'en',
  ckfinder: {
    // Config for image upload
    uploadUrl: '/path/to/upload/image',
  },
};

function EditPost(props){

  const { onReceivedTitle } = props;

  const [datapost, setDatapost] = useState(null);
  const [activeBtn, setActiveBtn] = useState('new-post-button active');
  const [allTag, setAllTag] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [tempListTag, setTempListTag] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [editorData, setEditorData] = useState('');
  const [inputValue, setInputValue] = useState({
    title: '',
    content: '',
    tag: '',
  });
  const navigate= useNavigate();
  var findingTags=[];
  var newTempListTag=[];

  const {id}=useParams();

  const [newTag, setNewTag] = useState({
    nameTag: '',
    createAt: new Date(),
    isDeleted: false,
  });

  useEffect(()=>{
    const getDataPost = async ()=>{
      try {
        const response = await axios.get(`http://localhost:9999/posts/${id}`);
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    }
    getDataPost()
    .then(data=>{
      setDatapost(data);
      onReceivedTitle(data.title);
      setInputValue({
        ...inputValue,
        title: data.title,
      })
      setTempListTag([
        ...tempListTag.concat(data.listTag)
      ])
      setEditorData(data.content)
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[]);

  //lấy danh sách tag
  useEffect(()=>{
    const getDataTag = async ()=>{
      try {
        const response =await axios.get(`http://localhost:9999/tags`);
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    };
    getDataTag()
    .then((data)=>{
      setAllTag(data);
    })
  },[inputValue.tag]);

  function onChangeValue(e){
    const {name, value} = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    
  }

  //lọc ra những tag có chứa ký tự nhập vào
  if(inputValue.tag.trim().length>0){
    findingTags = allTag?.filter(tag=>tag.nameTag.toLowerCase().includes(inputValue.tag.trim()));
  }

  //hàm chọn tag đã lọc ra ở trên
  function handleClickTag(e){
    if(!tempListTag.includes(e.target.innerText)){
      setTempListTag([...tempListTag,e.target.innerText]);
      setInputValue({
        ...inputValue,
        tag: '',
      })
    }
  }
  
  function handleCancelTag(e){
    newTempListTag = tempListTag.filter(tag=>tag!=e.target.getAttribute('data-name'));
    setTempListTag(newTempListTag);
  }

  useEffect(() => {
    if(!firstLoad){
      const inputField = document.querySelector('.new-post-tags-input');
      inputField.focus();
    }else{
      setFirstLoad(false);
    }
  }, [tempListTag]);

  function clearInput(){
    setInputValue({
      title: '',
      content: '',
      tag: '',
      })
    setTempListTag([]);  
    setNewTag({
      nameTag: '',
      createAt: '',
      isDeleted: false,
    })
  };

  var newInputPost={
    title: inputValue.title,
    content: inputValue.content,
    listTag: listTag,
  };

  function handleKeyDown(e){
    if(e.key=='Enter'){
      setTempListTag([
        ...tempListTag,
        e.target.value.trim(),
      ])
      setInputValue({
        ...inputValue,
        tag: '',
      })

    }
  }

  function handleUpdate(){
    
    console.log(newInputPost);

      var newTags = tempListTag.filter(tag=>!allTag.map(t=>t.nameTag).includes(tag));
      // var newTagsId = allTag.filter(tag=>tempListTag.includes(tag.nameTag)).map(tag=>tag._id);
      console.log(newTags);
      newTags.forEach(tag=>{
        axios.post(`http://localhost:9999/tags/`,{
          nameTag: tag,
          createAt: new Date(),
          isDeleted: false,
        })
        .then(res=>{
          console.log(res.data);
          clearInput();    
        })
        .catch(err=>{
          console.log(err.message);
        })
      });
      
      newInputPost.listTag=tempListTag;
      newInputPost.content= editorData;

      axios.put(`http://localhost:9999/posts/${id}`,newInputPost)
      .then(res=>{
        console.log(res.data);
        navigate(`/post/${id}`);
        clearInput();    
        setListTag([]);
        setFirstLoad(true); 
        navigate(`/post/${id}`);
      })
      .catch(err=>{
        console.log(err.message);
      })
  }

  return (
    <Wrapper>
      <div className='new-post-container'>
        <div className='new-post-item'>
          <div className='new-post-title'>
            <input autoComplete='off' type='text' className='new-post-title-input' placeholder='Tiêu đề'
              value={inputValue.title} name='title'
              onChange={e=>onChangeValue(e)}
            />
          </div>
        </div>
        
        <div className='new-post-item'>
          <div className='new-post-tags'>
          {tempListTag.length>0 &&(
            <ul className='temporary-tags'>
              {tempListTag.map((tag,index)=>(
                <li className='temporary-tag-item' key={index}>
                  {tag}
                  <span data-name={tag} onClick={e=>handleCancelTag(e)}>x</span>
                </li>
              ))}
            </ul>
          )}
            <input autoComplete='off' type='text' className='new-post-tags-input' placeholder='Gắn thẻ'
              value={inputValue.tag} name='tag'
              onChange={e=>onChangeValue(e)}
              onKeyDown={e=>handleKeyDown(e)}
            />
          </div>
          {inputValue.tag.trim().length>0 && findingTags.length>0 && (
              <ul className='tag-list'>
                {findingTags.map((tag)=>(
                  <li onClick={e=>handleClickTag(e)} key={tag._id} className='tag-item'>{tag.nameTag}</li>
                ))}
              </ul>
            )}
        </div>
        
        
        <div className='new-post-action'>
          <button onClick={handleUpdate} className={activeBtn}>Lưu</button>
        </div>

        <div className='new-post-item'>
          {/* <div className='new-post-content'>
            <textarea autoComplete='off' type='text' className='new-post-content-input' placeholder='Nội dung bài viết'
              value={inputValue.content} name='content'
              onChange={e=>onChangeValue(e)}
            />
          </div> */}
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          // config={{
          //   toolbar: {
          //     items: [
          //       'undo', 'redo', 
          //       '|',
          //       'heading', 
          //       '|', 
          //       'bold', 'italic', 'blockQuote',
          //       '|', 
          //       'link', 'imageUpload', 'codeBlock', 'insertTable', 
          //       '|', 
          //       'bulletedList', 'numberedList', 'outdent', 'indent',
          //     ],
          //     shouldNotGroupWhenFull: true,
          //   },
          //   ckfinder: {
          //     // Config for image upload
          //     uploadUrl: '/path/to/upload/image',
          //   },
          // }}
          onChange={(e, editor) => {
            const data = editor.getData();
            setEditorData(data);
            console.log(data);
          }}
        />  
        
      </div>
    </Wrapper>
  )
}

export default EditPost;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 80px;
  padding: 0 12px;
  box-sizing: border-box;

  .new-post-item{
    margin-bottom: 12px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    
  }

  .new-post-item>div{
    border: 1px solid var(--shadow-color);
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    text-align: center;
    align-items: center;
  }

  .temporary-tags{
    display: flex;
    width: max-content;
    height: 100%;
    text-align: center;
    margin: 0;
    display: flex;
    align-items: center;
  }

  .temporary-tag-item{
    height: 100%;
    background-color: var(--primary-color);
    border-radius: 4px;
    padding: 0 4px; 
    margin-left: 4px;
    display: flex;
    align-items: center;
    width: max-content;


    & span{
      margin-left: 4px;
      cursor: pointer;
      height: 14px;
      width: 14px;
      border-radius: 7px;
      align-items: center;
      justify-content: center;
      display: flex;
    }

    & span:hover{
      background-color: var(--shadow-color); 
    }
  }

  .new-post-item>div:focus-within{
    border: 1px solid var(--hightlight-color);
  }

  input{
    padding: 8px 16px;
    border: none;

    &:focus{
      
    }
  } 

  .tag-list{
    position: absolute;
    top: 100%;
    border: 1px solid var(--shadow-color);
    box-shadow: 0 0 10px var(--shadow-color);
    border-radius: 8px;
    background-color: white; 
    width: 100%;
    overflow: hidden;
    z-index: 10;
  }

  .tag-item{
    padding: 4px 12px;
    cursor: pointer;

    &:hover{
      background-color: var(--primary-color);
    }
  }

  .new-post-action{
    display: flex;
    justify-content: right;
    margin-bottom: 12px;
  }

  .new-post-button{
    background-color: var(--shadow-color);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    transition: var(--transition-time);
  }

  .new-post-button.active{
    background-color: var(--hightlight-color);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    transition: var(--transition-time);
    cursor: pointer;
  }

  .new-post-button.active:hover{
    opacity: 0.6;
  }

  .new-post-content{
    height: 700px;
    width: 100%;
  }

  .new-post-content-input{
    outline: none;
    border: none;
    padding: 8px 16px;
    height: 100%;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    resize: none;
  }

  .ck-editor{
    flex-wrap: wrap;
    height: max-content;
    width: 100%;
    box-sizing: border-box;
  }

  .ck-editor__top{
    width: 100%;
    height: 40px;
  }

  .ck-editor__main{
    width: 100%;
    height: 700px;

    & .ck-editor__editable:focus-within{
      border: 1px solid var(--hightlight-color);
    }
  }

  .ck-editor__editable{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

`