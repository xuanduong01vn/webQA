import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';

function PostReply(props){

  const {parent, closeReply, author, post, onLoad} = props;
  const [amountCmt, setAmountCmt] = useState(post?.amountComment);
  const [activeReply, setActiveReply]=useState(true);
  const [inputComment, setInputComment] = useState('');
  const [valueComment, setValueComment] = useState({
    content: '',
    idUser: '66669b9c646d48fe74ba397b',
    idPost: post?._id,
    createAt: new Date(),
    idParent: parent?._id,
    isDeleted: false,
  });

  
  
  function closeReplyBox(){
    closeReply('');
  }

  function onChangeInput(e){
    setInputComment(e.target.value);
    setValueComment({
      ...valueComment,
      content: e.target.value.trim(),
    })
  }

  function cancelComment(){
    setInputComment('');
  }

  function postComment(){
    if(inputComment.trim().length>0){
      setValueComment({
        ...valueComment,
        content: inputComment.trim(),
      })

      axios.post(`http://localhost:9999/comments`,valueComment)
      .then(res=>{
        closeReply('');
        cancelComment();
        setValueComment({
          ...valueComment,
          content: '',
        });

      })
      .catch(err=>{
        console.log(err.message);
      })

      onLoad(amountCmt + 1);

      axios.put(`http://localhost:9999/posts/${parent.idPost}`,{amountComment: amountCmt + 1})
      .then(res=>{
        console.log(res.data);
        setAmountCmt(res.data.data.amountComment)
      })
      .catch(err=>{
        console.log(err.message);
      })
    }
  }
  
console.log(amountCmt);


  return (
    <Wrapper>
        <div className="post-reply-type-box">
        <div className="reply-current-user">
          <img src="https://www.vietnamfineart.com.vn/wp-content/uploads/2023/07/anh-avatar-dep-cho-con-gai-1.jpg" 
          alt="" className="reply-current-user-avatar" />
          <p className="reply-current-user-name">xuanduong</p>
        </div>
        <input className="reply-type-box" type="text" placeholder="Viết bình luận..."
          autoFocus
          value={inputComment}
          onChange={onChangeInput}
          />
        <button className={inputComment.trim().length>0?"reply-send-btn active":"reply-send-btn hide"}
          onClick={()=>{postComment()}}
          >Bình luận</button>
        <button className="reply-send-btn" onClick={closeReplyBox}>Hủy</button>
      </div>
      
    </Wrapper>
  )
}

export default PostReply;

const Wrapper = styled.div`

.post-reply-type-box{
    padding-top: 12px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    text-align: right;
  }

  .reply-current-user{
    border-top: 1px solid var(--shadow-color);
    padding-top: 12px;
  }

  .reply-current-user{
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    width: 100%;
  }

  .reply-current-user-avatar{
    height: 36px; 
    width: 36px;
    border-radius: 50%; 
    margin-right: 12px;
  }

  .reply-current-user-name{
    margin: 0;
  }

  .reply-type-box{
    border: 1px solid var(--shadow-color);
    border-radius: 4px;
    outline: none;
    padding: 8px;
    min-height: 36px;
    width: 100%;
    box-sizing: border-box;
  }      
  
  .reply-send-btn{
    margin: 12px 0 0 12px;
    padding: 12px 18px;
    background-color: var(--shadow-color);
    border: none;
    border-radius: 8px;
    color: white; 
    cursor: pointer;
    
    &:hover{
      opacity: 0.6;
    }
  }

  .reply-send-btn.active{
    background-color: var(--hightlight-color);
  }

  .reply-send-btn.hide{
    background-color: var(--shadow-color);
    cursor: default;

    &:hover{
      opacity: 1;
    }
  }

  .reply-item-user-avatar{
    height: 36px; 
    width: 36px;
    border-radius: 50%;
    margin-right: 12px;
  }

  

  .reply-item-user-created{
    text-align: left;
  }

  .reply-item-username{
    color: var(--hightlight-color);
    font-weight: 600;

    &:hover{
      text-decoration: underline;
    }
  }

  .reply-item-created-time{
    margin: 0;
    font-size: 14px;
  }

  .reply-item-content p{
    text-align: left;
    font-size: 18px;
    margin: 4px 0;
  }

  .reply-item-action{
    display: flex ;
  }

  .reply-item-btn{
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 4px 0;
    margin-right: 12px;
  }

  .reply-item-btn.active{
    color: var(--hightlight-color);
  }

`