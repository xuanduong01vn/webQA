import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faThumbsUp,
  faThumbsDown,
  faStar
}from '@fortawesome/free-solid-svg-icons'

function AccountPostItem(props){
  const {post, author, time } = props;


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
  function seeNotify(e){
    // console.log(e);
    // e.scrollIntoView({ behavior: 'smooth' });
    if(post?.isSeen==false){
      axios.put(`http://localhost:9999/notify/${post?._id}`,{
        isSeen: true,
      })
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err.message);
      })

      
    }
  }

  return(
    <Wrapper>
      {post?.isDeletedPost
        ?(
          <div className='question-item-cover'>
            <div className='question-item-title'>
              <h3 className='question-item-alert'>Bài viết đã bị xóa</h3> 
            </div>
            <div className='question-item-user'>
              <div className='question-item-author'>
              </div>
              <span className='uestion-item-author-ask'>{formatTime(post.createAt || post.markedAt || post.likedAt)}</span>
            </div>
          </div>
        )
        :(
          <div className='question-item-cover' onClick={e=>seeNotify(e.currentTarget)}>
            <Link to={post?.linkNotify || `/post/${post?._id}`} className='question-item-title'>
              <h3 dangerouslySetInnerHTML={{ __html: post?.title}}></h3> 
              <div className='notify-item-detail'>
                <span className='notify-item-content' dangerouslySetInnerHTML={{ __html: post?.contentNotify}}></span> 
                {post?.isSeen==false &&
                  <span className='notify-item-state'></span>
                }
                
              </div>
              
              <p className='question-item-notify-at'>{formatTime(post?.notifyAt)}</p>
            </Link>
            <div className='question-item-user'>
              <div className='question-item-author'>
                <Link to={`/user/${author?._id}`} className='question-item-author-info'>
                  {author?.username}
                </Link>
              </div>
              <span className='question-item-author-ask'>{formatTime(post?.createAt || post?.markedAt || post?.likedAt)}</span>
            </div>

            <div className='question-item-interact'>
              {/* <div className='question-item-likes'>
                <FontAwesomeIcon icon={faStar} />{post.amountLiked}
              </div> */}
              {/* <div className='question-item-dislikes'>
                <FontAwesomeIcon icon={faThumbsDown} />6
              </div> */}
              {/* <div className='question-item-comments'>
                <FontAwesomeIcon icon={faComment} />{post.amountComment}
              </div> */}
            </div>
          </div>
        )
      }
    </Wrapper>
  )
}

export default AccountPostItem;

const Wrapper = styled.div`

  .question-item-cover{
    width: 100%;
    box-sizing: border-box;
  }

  .question-item-title{
    margin: 0;
    transition: var(--transition-time);
    width: 100%;

    & h3{
      margin: 0;
    }

    &:hover h3{
      color: var(--hightlight-color);
    }

    &:hover .notify-item-detail{
      color: var(--hightlight-color);
    }
  }

  .question-item-user{
    display: flex;
    margin: 4px 0;
    justify-content: space-between;
    font-size: 14px;

    & p{
      margin: 0;
    }
  }

  .question-item-author{
    margin-right: 4px;
  }

  .question-item-alert{
    font-weight: 600;
    color: var(--shadow-color);
  }

  .question-item-author-info{
    font-weight: 600;
    color: var(--hightlight-color);
    transition: var(--transition-time);

    &:hover{
      text-decoration: underline;
    }
  }

  .question-item-interact{
    display: flex;
    justify-content: left;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;

    &>div{
      margin-right: 16px;
      color: var(--shadow-color);
    }

    & svg{
      margin-right: 4px;
    }
  }

  .question-item-notify-at{
    margin: 0;
  }

  .user-create-notify{
    font-weight: 700;
  }

  .notify-item-detail{
    width: 100%;
    display: flex;
  }

  .notify-item-content{
    width: 100%;
  }

  .notify-item-state{
    min-width: 8px;
    height: 8px;
    background-color: var(--hightlight-color);
    box-sizing: border-box;
    border-radius: 50%;
    display: inline-block;
    margin-left: 12px;
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