import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
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

function QuestionItem(props){
  const {post, author}=props;

  var timeCreated;
  const now = new Date();
  if(now.getFullYear()== new Date(post.createAt).getFullYear()){
    timeCreated= format(new Date(post.createAt), 'HH:mm - dd MMM', { locale: vi });
  }
  else{
    timeCreated= format(new Date(post.createAt), 'HH:mm - dd MMM yyyy', { locale: vi });
  }

  return(
    <Wrapper>
      <div className='question-item-cover'>
        <Link to={`/post/${post?._id}`} className='question-item-title'>
          <h3>{post?.title}</h3> 
          </Link>
        <div className='question-item-user'>
          <div className='question-item-author'>
            <Link to={`/user/${author?._id}`} className='question-item-author-info'>
              {author?.username}
            </Link>
          </div>
          <span className='uestion-item-author-ask'>{timeCreated}</span>
        </div>
        
        <div className='question-item-interact'>
          <div className='question-item-likes'>
            <FontAwesomeIcon icon={faStar} />{post.amountLiked}
          </div>
          {/* <div className='question-item-dislikes'>
            <FontAwesomeIcon icon={faThumbsDown} />6
          </div> */}
          <div className='question-item-comments'>
            <FontAwesomeIcon icon={faComment} />{post.amountComment}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default QuestionItem;

const Wrapper = styled.div`

  .question-item-cover{
    width: 100%;
  }

  .question-item-title{
    margin: 0;
    transition: var(--transition-time);

    & h3{
      margin: 0;
    }

    &:hover h3{
      color: var(--hightlight-color);
    }
  }

  .question-item-user{
    display: flex;
    margin: 4px 0;
    font-size: 14px;

    & p{
      margin: 0;
    }
  }

  .question-item-author{
    margin-right: 4px;
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

`