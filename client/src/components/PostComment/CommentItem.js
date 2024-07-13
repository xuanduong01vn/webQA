import styled from 'styled-components';
import React, {useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { AuthContext } from '../../AuthContext';

import PostReply from './PostReply';

function CommentItem(props){

  const authToken = useContext(AuthContext);
  const {comment, author, deleteComment, post, openReply} =props;
  const [classInput, setClassInput] = useState('');
  const [isDeletedPost, setIsDeletedPost]=useState(comment.isDeleted);
  const [inputComment, setInputComment] = useState('');
  const [valueComment, setValueComment] = useState({
    content: '',
    idUser: authToken.idCurrentUser,
    idPost: comment.idPost,
    createAt: new Date(),
    idParent: '',
    isDeleted: false,
  });

  const navigate = useNavigate();

  console.log(author);
  //khi 
  useEffect(()=>{
    if(comment.content.lenght>0){
      setInputComment(comment.content);
    }
  },[comment.content.lenght]);

  //mở input tạo mới reply
  function openReplyBox(e){
    if(authToken.idCurrentUser){
      openReply(comment._id);
    }
    else{
      navigate('/login');
    }
    
  }

  //lấy giá trị nhập vào mỗi khi thay đổi
  function onChangeValue(e){
    setInputComment(e.target.value);
  }

  //hiển thị thời gian theo định dạng
  const now = new Date();
  function formatTime(time){  
    if(time?.length>0){
      if(now.getFullYear()== new Date(time).getFullYear()){
        return format(new Date(time), 'HH:mm, dd MMM', { locale: vi });
      }
      else{
        return format(new Date(time), 'HH:mm, dd MMM yyyy', { locale: vi });
      }
    }
  }

  const textareaRef = useRef(null);
  //mở input sửa comment
  function onEditComment(id){
    setClassInput(id);
    setInputComment(comment.content);
  }

  // useEffect(()=>{
  //   const getAuhtor= async()=>{
  //     try {
  //       const responce = await axios.get(`http://localhost:9999/accounts/${id}`)
  //     } catch (err) {
  //         console.log(err.message);
  //     }
  //   }
  // },[])

  //focus vào textarea và đặt vị trí con trỏ vào cuối văn bản
  useEffect(() => {
    if (classInput !== null && textareaRef.current) {
      
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [classInput, inputComment]);

  //xử lý sửa comment
  function handleEditComment(idCmt){
    if(inputComment.length>0){
      axios.put(`http://localhost:9999/comments/${idCmt}`,{content: inputComment})
      .then(res=>{
        comment.content=res.data.data.content;
        setClassInput(null);
      })
      .catch(err=>{
        console.log(err.message);
      })
    }
  }

  return(
    <Wrapper>
      {isDeletedPost
      ?(<div key={comment._id} className='comment-item'>
        <div className='comment-item-created'>
          <div className='comment-item-user-avatar'>
            <img src={author?.avatar} alt='' className='comment-item-user-image'/>
          </div>
          <div className='comment-item-user-created'>
            <Link to={`/user/${comment.idUser}`} className='comment-item-username'>{author?.username}</Link>
            <span className='comment-item-created-time'> bình luận lúc {formatTime(comment.createAt)}</span>
          </div>
        </div>
        <div className='comment-item-content'>
          <span style={{color:'var(--shadow-color)'}}>Bình luận này đã bị xóa!</span>
        </div>
      </div>)
      :(
        <div key={comment._id} className='comment-item'>
          <div className='comment-item-created'>
            <div className='comment-item-user-avatar'>
              <img src={author?.avatar} alt='' className='comment-item-user-image'/>
            </div>
            <div className='comment-item-user-created'>
              <Link to={`/user/${comment.idUser}`} className='comment-item-username'>{author?.username}</Link>
              <span className='comment-item-created-time'> bình luận lúc {formatTime(comment.createAt)}</span>
            </div>
          </div>
          <div className='comment-item-content'>
            {classInput==comment._id 
            ?(<textarea autoFocus 
              ref={textareaRef}
              className='comment-content-box'
              value={inputComment}
              onChange={e=>onChangeValue(e)}
              />)
            :(<p>{comment.content}</p>)
            }
            
          </div>
          {classInput != comment._id
            ?(<div className='comment-item-action'>
                <button className='comment-item-btn active'
                onClick={openReplyBox}>
                  Trả lời
                </button>
                {comment.idUser == authToken.idCurrentUser &&
                  <button onClick={()=>{onEditComment(comment._id)}} className='comment-item-btn'>
                    Sửa
                  </button>
                }
                {comment.idUser == authToken.idCurrentUser && 
                  <button 
                    onClick={()=>{
                      deleteComment(comment._id);
                      setIsDeletedPost(true);
                    }} 
                    className='comment-item-btn'>
                      Xóa
                  </button>
                }
              </div>)
            :(<div className='comment-item-action'>
                <button className='comment-item-btn'
                onClick={()=>setClassInput(null)}>
                  Hủy
                </button>
                <button onClick={()=>{handleEditComment(comment._id)}} className={inputComment.trim().length>0?'comment-item-btn active':'comment-item-btn disable'}>
                  Lưu
                </button>
              </div>
            )
          }
        </div>
      )  
      }
        
    </Wrapper>
  )
}

export default CommentItem;

const Wrapper = styled.div`

  .comment-item{
    width: 100%;
    box-sizing: border-box;
  }

  .comment-content-box{
    margin-top: 8px;
    padding: 8px;
    border: 1px solid var(--shadow-color);
    border-radius: 8px; 
    outline: none;
    font-size: 16px;
    box-sizing: border-box;
    min-width: 100%;
    max-width: 100%;
    min-height: 36px;
    resize: vertical;
  }

  .comment-item-created{
    display: flex;
    align-items: center;
  }

  .comment-item-user-avatar{
    height: 36px; 
    width: 36px;
    border-radius: 50%;
    margin-right: 12px;
    overflow: hidden;
    background-color: var(--blur-color);
  }

  .comment-item-user-image{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .comment-item-user-created{
    text-align: left;
  }

  .comment-item-username{
    color: var(--hightlight-color);
    font-weight: 600;

    &:hover{
      text-decoration: underline;
    }
  }

  .comment-item-created-time{
    margin: 0;
    font-size: 14px;
  }

  .comment-item-content p{
    text-align: left;
    font-size: 18px;
    margin: 4px 0;
  }

  .comment-item-action{
    display: flex ;
  }

  .comment-item-btn{
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 4px 0;
    margin-right: 12px;
  }

  .comment-item-btn:hover{
    color: var(--hightlight-color);
  }

  .comment-item-btn.active{
    color: var(--hightlight-color);
  }

  .comment-item-btn.disable{
    color: var(--shadow-color);
    cursor: default;
  }

`