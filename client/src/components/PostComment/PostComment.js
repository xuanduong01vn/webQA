import styled from 'styled-components';
import React, {useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { format, longFormatters } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment 
} from '@fortawesome/free-regular-svg-icons';

import CommentItem from './CommentItem.js';
import PostReply from './PostReply.js';
import { AuthContext } from '../../AuthContext.js';

function PostComment(props){
  const commentPoint =3;
  const {post}= props;
  const location = useLocation();
  const authToken = useContext(AuthContext);
  const [inputComment, setInputComment] = useState('');
  const [amountCmt, setAmountCmt] = useState(post?.amountComment);
  const [engageRate, setEngageRate] = useState(post.engageRate);
  const [listComment, setListComment] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [idCmt, setIdCmt] = useState('');
  const [valueComment, setValueComment] = useState({
    content: '',
    idUser: authToken.idCurrentUser,
    idPost: post._id,
    createAt: new Date(),
    idParent: '',
    isDeleted: false,
  });

  //lấy danh sách comment của bài viết
  useEffect(()=>{
    const getComments = async(req,res)=>{
      try {
        const response = await axios.get(`http://localhost:9999/comments?idPost=${post._id}&sort=asc`);
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    }
    getComments()
    .then(data=>{
      setIdCmt('');
      setListComment(data);
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[amountCmt]);

  //lấy ra danh sách người dùng
  useEffect(()=>{
    const getUsers = async(req,res)=>{
      try {
        const response = await axios.get(`http://localhost:9999/accounts`);
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    }
    getUsers()
    .then(data=>{
      setListUser(data);
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[]);

  //hàm lấy data người dùng theo comment
  function getInfoUser(id){
    return listUser.find(user=>user._id==id)
  }

  function onChangeInput(e){
    setInputComment(e.target.value);
    setValueComment({
      ...valueComment,
      content: e.target.value.trim(),
    })
  }

  //hàm hủy tạo comment mới
  function cancelComment(){
    setInputComment('');
  }

  //hàm xử lý thêm mới comment vào db
  function postComment(){
    if(inputComment.trim().length>0){
      setValueComment({
        ...valueComment,
        content: inputComment.trim(),
      })

      let idNewCmt='';

      //post comment mới lên db
      axios.post(`http://localhost:9999/comments`,valueComment)
      .then(res=>{
        cancelComment();
        setValueComment({
          ...valueComment,
          content: '',
        })

        //tao thong bao moi
      if(post?.idAuthor!=authToken?.idCurrentUser){
        axios.post(`http://localhost:9999/notify`,{
          idAccount: post?.idAuthor,
          contentNotify: `<span class='user-create-notify'>${authToken?.userLogin?.username}</span> đã bình luận bài viết của bạn`,
          notifyAt: new Date(),
          linkNotify: `${location.pathname}`,
          isSeen: false,
          idLink: res.data._id,
        })
        .then(res=>{
          console.log(res.data);
        })
        .catch(err=>{
          console.log(err.message);
        })

        axios.put(`http://localhost:9999/accounts/${post?.idAuthor}`,{
          newNotify: authToken?.userLogin?.newNotify+1,
        })
        .then(res=>{
          console.log(res.data);
          authToken.updateNotifyState(res.data.data.newNotify+1);
        })
        .catch(err=>{
          console.log(err.message);
        })
      }
      })
      .catch(err=>{
        console.log(err.message);
      })

      
      

      //update số lượng comment của bài viết
      axios.put(`http://localhost:9999/posts/${post._id}`,
      {
        amountComment: amountCmt+1,
        engageRate: engageRate+commentPoint,
      })
      .then(res=>{
        console.log(res.data);
        setAmountCmt(res.data.data.amountComment);
      })
      .catch(err=>{
        console.log(err.message);
      })
    }
  }

  function postReply(inputReply){
    if(inputReply){
      //post comment mới lên db
      axios.post(`http://localhost:9999/comments`,inputReply)
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err.message);
      })

      //update số lượng comment chủa bài viết
      axios.put(`http://localhost:9999/posts/${post._id}`,
      {
        amountComment: amountCmt+1,
        engageRate: engageRate+commentPoint,
      })
      .then(res=>{
        console.log(res.data);
        setAmountCmt(res.data.data.amountComment);
      })
      .catch(err=>{
        console.log(err.message);
      })
    }
  }

  //hàm xử lý xóa comment bài viết
  function handleDeleteComment(idCmt){
    //hàm update comment chuyển sang trạng thái đã xóa
    axios.put(`http://localhost:9999/comments/${idCmt}`,{isDeleted: true})
    .then(res=>{
      
    })
    .catch(err=>{
      console.log(err.message);
    })

    //update số lượng comment của bài viết
    axios.put(`http://localhost:9999/posts/${post._id}`,
    {
      amountComment: amountCmt-1,
      engageRate: engageRate-commentPoint,
    })
    .then(res=>{
      console.log(res.data.data);
      setAmountCmt(res.data.data.amountComment);
    })
    .catch(err=>{
      console.log(err.message);
    })
  }

  //Xử lý mở input trả lời cmt
  function handleOpenReply(param){
    setIdCmt(param);
  }

  function handleCloseReply(param){
    setIdCmt(param);
  }

  return(
    <Wrapper>
      <div className='post-comment-container'>
        {!authToken.idCurrentUser 
        ?(
          <div className='post-comment-alert'>
            <FontAwesomeIcon icon={faComment}/>
            <p>Đăng nhập để bình luận</p>
          </div>
        )
        :(
          <div className='post-comment-type-box'>
            <div className='comment-current-user'>
              <div className='comment-current-user-avatar'>
                <img src={authToken.userLogin.avatar} alt='' className='comment-current-user-image'/>
              </div>
              <p className='comment-current-user-name'>{authToken.userLogin.username}</p>
            </div>
            <textarea className='comment-type-box' type='text' placeholder='Viết bình luận...'
            value ={inputComment}
            onChange={onChangeInput}/>
            <button onClick={postComment} className='comment-send-btn active'>Bình luận</button>
            <button onClick={cancelComment} className='comment-send-btn'>Hủy</button>
          </div>
        )}
        
        {listComment.length==0
        ?(<h3>Chưa có bình luận nào</h3>)
        :(listComment.length>0)?
          (
            <ul className='post-comment-list'>
              {listComment.filter(cmt=>cmt.idParent=='').map(comment=>(
                <li key={comment._id} id={comment._id} className='post-comment-item'>
                  <CommentItem post={amountCmt} comment={comment} 
                  author={getInfoUser(comment.idUser)}
                  openReply={handleOpenReply}
                  deleteComment={handleDeleteComment}/>
                  {idCmt==comment?._id && 
                  (<PostReply 
                  postReply={postReply}  
                  parent={comment}
                  post={post}
                  closeReply={handleCloseReply}
                  />)}
                  <ul className='post-reply-list'>
                    {listComment.filter(cmt=>cmt.idParent!='' && cmt.idParent==comment._id).map(rep=>(
                      
                      <li key={rep._id} id={rep._id} className='post-reply-item'>
                        <CommentItem post={amountCmt} comment={rep} 
                        deleteComment={handleDeleteComment}
                        author={getInfoUser(rep.idUser)}
                        openReply={handleOpenReply}/>
                        {idCmt==rep?._id && 
                        <PostReply
                        postReply={postReply}
                        parent={comment}
                        post={post}
                        closeReply={handleCloseReply}
                        />
                        }
                        
                      </li>
                      
                    ))}
                  </ul>
                </li>
                
                
              ))}
            
          </ul>
          )
          :(<h3> </h3>)
        }

      </div>
    </Wrapper>
  )
}

export default PostComment;

const Wrapper = styled.div`

  .post-comment-container{
    width: 100%;
    border-top: 1px solid var(--shadow-color);
    text-align: left;
  }

  .post-comment-alert{
    border: 1px solid var(--shadow-color);
    color: var(--shadow-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 12px 0;
    margin-top: 12px;

    svg{
      margin-right: 12px;
    }
  }

  .post-comment-type-box{
    width: 100%;
    border: 1px solid var(--shadow-color);
    border-radius: 8px;
    padding: 12px;
    box-sizing: border-box;
    text-align: right;
    margin-top: 12px;
    
  }

  .comment-current-user{
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    width: 100%;
  }

  .comment-current-user-avatar{
    height: 36px; 
    width: 36px;
    border-radius: 50%; 
    margin-right: 12px;
    overflow: hidden;
    background-color: var(--blur-color);
  }

  .comment-current-user-image{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .comment-current-user-name{
    margin: 0;
  }

  .comment-type-box{
    border: 1px solid var(--shadow-color);
    border-radius: 4px;
    outline: none;
    padding: 8px;
    min-height: 60px;
    min-width: 100%;
    box-sizing: border-box;
    resize: none;
    height: max-content;
  }      
  
  .comment-send-btn{
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

  .comment-send-btn.active{
    background-color: var(--hightlight-color);
  }

  .post-comment-list{
    list-style: none;
    padding: 0;
    margin: 12px 0;
    width: 100%;
  }

  .post-comment-item{
    border: 1px solid var(--shadow-color);
    border-radius: 8px;
    padding: 12px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 12px;
  }

  .post-reply-list{
    list-style: none;
    padding: 0 0 0 36px;
    margin-top: 12px;
    width: 100%;
    box-sizing: border-box;
  }

  .post-reply-item{
    border-top: 1px solid var(--shadow-color);
    outline: none;
    padding: 12px 0;
    width: 100%;
    box-sizing: border-box;
  }

  .reply-item-created{
    display: flex;
    align-items: center;
  }


  /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {
    

  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {

  }

  /* small phone */
  @media (max-width: 480px) {

  }

`