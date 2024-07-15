import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faThumbsUp,
  faThumbsDown,
  faStar
}from '@fortawesome/free-solid-svg-icons';
import QuestionItem from '../QuestionItem/QuestionItem';

function QuestionList(){

  const [noQuestion,setNoQuestion]=useState(false);
  const [postList, setPostList] = useState(null);
  const [authorList, setAuthorList] = useState(null);

  useEffect(()=>{
    const getDataPost = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/posts/?isDeleted=false`);
        return await response.data;
      } catch (err) {
        console.log('Error fetching posts:', err.message);
        return [];
      }
    };
    getDataPost()
    .then((data) => {
      setPostList(data.sort((a, b) => b.amountComment - a.amountComment).slice(0,5));
    })
    .catch((err)=>{
      console.log(err.message);
    });
  },[]); 

  useEffect(()=>{
    const getDataAuthor = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/accounts/`);
        return response.data;
      } catch (err) {
        console.log('Error fetching authors:', err.message);
        return [];
      }
    };
    getDataAuthor()
    .then((data) => {
      setAuthorList(data);
    })
    .catch((err)=>{
      console.log(err.message);
    });
  },[]); 

  return (
    <Wrapper>
      <div className='question-list-container'>
      <h2 className='question-container-title'>Bài viết nổi bật</h2>
      {postList?.length==0 &&
        <div className='blog-list-alert'>
          <span>Không có bài viết nào</span>
        </div>
      }
      {postList?.length>0 &&
        <ul className='question-list-box'>
          {postList.map(post=>(
            <li key={post._id} className='question-item'>
              <QuestionItem post={post} author={authorList?.find(acc=>acc._id==post.idAuthor)}/>
            </li>
          ))}
        </ul>
      }
      </div>
    </Wrapper>
  )
}

export default QuestionList;

const Wrapper = styled.div`
  width: 30%;
  box-sizing: border-box;
  margin-left: 18px;
  text-align: left;
  

  .question-list-box{
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .question-item{
    border-bottom: 1px solid var(--shadow-color);

    &:last-child{
      border-bottom: none ;
    }
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

    &:hover p{
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

    /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {
    width: 40%;
    
  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    width: 100%;
    margin-left: 0;
    margin-top: 36px;
  }

  /* small phone */
  @media (max-width: 480px) {
    width: 100%;
    margin-left: 0;
    margin-top: 36px;

    
  }
  
  
`