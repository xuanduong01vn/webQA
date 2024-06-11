import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


function NewPost(){

  const [activeBtn, setActiveBtn] = useState('new-post-button');
  const [allTag, setAllTag] = useState([]);
  const [listTag, setListTag] = useState([]);
  const [tempListTag, setTempListTag] = useState([]);
  const [inputValue, setInputValue] = useState({
    title: '',
    content: '',
    tag: '',
  });

  useEffect(()=>{
    const getDataTag = async ()=>{
      try {
        const response =await axios.get('http://localhost:9999/tags');
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    };
    getDataTag()
    .then((data)=>{
      setAllTag(data);
    })
  },[]);

  

  var findingTags=[];

  function onChangeValue(e){
    const {name, value} = e.target;
    if(e.target.name == 'title'){
      setActiveBtn(e.target.value.trim().length>0?'new-post-button active':'new-post-button');
    }
      
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    
  }

  if(inputValue.tag.trim().length>0){
    findingTags = allTag?.filter(tag=>tag.nameTag.toLowerCase().includes(inputValue.tag));
  }

  function handleClickTag(e){
    if(!tempListTag.includes(e.target.innerText)){
      setTempListTag([...tempListTag,e.target.innerText]);
    }
  }

  function handleCancelTag(e){
    const newTempListTag = tempListTag.filter(tag=>tag!=e.target.name);
    setTempListTag(newTempListTag);
  }

  console.log(tempListTag);


  useEffect(()=>{
    setTempListTag(tempListTag);
  },[tempListTag])  

  function handlePublish(){
    if(inputValue.title.trim().length>0)
      console.log(inputValue);
  }

  return (
    <Wrapper>
      <div className="new-post-container">
        <div className="new-post-item">
          <div className="new-post-title">
            <input autoComplete="off" type="text" className="new-post-title-input" placeholder="Tiêu đề"
              value={inputValue.title} name='title'
              onChange={e=>onChangeValue(e)}
            />
          </div>
        </div>
        
        <div className="new-post-item">
          <div className="new-post-tags">
          {tempListTag.length>0 &&(
            <ul className="temporary-tags">
              {tempListTag.map((tag,index)=>(
                <li className="temporary-tag-item" key={index}>
                  {tag}
                  <button name={tag} onClick={e=>handleCancelTag(e)}>x</button>
                </li>
              ))}
            </ul>
          )}
            <input autoComplete="off" type="text" className="new-post-tags-input" placeholder="Gắn thẻ"
              value={inputValue.tag} name='tag'
              onChange={e=>onChangeValue(e)}
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
        
        
        <div className="new-post-action">
          <button onClick={handlePublish} className={activeBtn}>Xuất bản</button>
        </div>

        <div className="new-post-item">
          <div className="new-post-content">
            <textarea autoComplete="off" type="text" className="new-post-content-input" placeholder="Nội dung bài viết"
              value={inputValue.content} name='content'
              onChange={e=>onChangeValue(e)}
            />
          </div>
        </div>
        
      </div>
    </Wrapper>
  )
}

export default NewPost;

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

    & button{
      margin-left: 4px;
      cursor: pointer;
      height: 14px;
      width: 14px;
      border-radius: 7px;
      align-items: center;
      justify-content: center;
      display: flex;
    }

    & button:hover{
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
    cursor: default;
  }

  .new-post-button.active{
    background-color: var(--hightlight-color);
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

`