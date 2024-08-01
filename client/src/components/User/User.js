import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PostList from '../PostList/PostList';

function UserLayout(props){

  const {onDataReceived} = props;
  const { id } = useParams();

  const [useData, setUseData ] = useState({});
  const [userPost, setUserPost] = useState(0);
  const [userLiked, setUserLiked] = useState(0);

  useEffect(()=>{
    const getUserData = async ()=>{
      try {
        const response = await axios.get(`http://localhost:9999/accounts/${id}`);
        return response.data;
      } catch (err) {
        console.log(err.message);
        return {};
      }
    };
    getUserData()
    .then((res)=>{
      setUseData(res);
      onDataReceived(res.fullname || res.username);
    })
    .catch((err)=>{
      console.log(err.message);
    })
  },[id])

  useEffect(()=>{
    const getUserPost = async(req, res)=>{
      try {
        const res= await axios.get(`http://localhost:9999/posts/?isDeleted=false&idAuthor=${id}`);
        return res.data;
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserPost()
    .then(res=>{
      setUserLiked(res.reduce((likeSum,post)=>{
        return likeSum + post.amountLiked;
      },0));
      setUserPost(res.length);
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[id]);

  return (
    <Wrapper>
      <div className='user-layout'>
        <div className='user-info-container'>
          <div className='user-info-person'>
            <div className='user-info-avatar'>
              <img src={useData?.avatar} alt='' className='user-info-image'/>
            </div>
            <div className='user-info-name'>
              <p className='user-info-fullname'>{useData?.fullname}</p>
              <p className='user-info-username'>{useData?.username}</p>
            </div>
          </div>
          <div className='user-statistic'>
            <div className='statistic-item'>
              <span className='statistic-title'>Số lượng bài viết </span>
              <span className='statistic-ammount'>{userPost}</span>
            </div>
            {/* <div className='statistic-item'>
              <span className='statistic-title'>Số lượng câu hỏi </span>
              <span className='statistic-ammount'>8</span>
            </div> */}
            <div className='statistic-item'>
              <span className='statistic-title'>Tổng số lượt yêu thích </span>
              <span className='statistic-ammount'>{userLiked}</span>
            </div>
          </div>
        </div>
        <div className='user-content'>
          <h2 className='blog-container-title'>Bài viết</h2>
            <PostList idUser={id}/>
          {/* <QuestionList/> */}
        </div>
        
      </div>
      
    </Wrapper>
  )
}

export default UserLayout;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
  min-height: 560px;

  .user-layout{
    width: var(--general-width);
    margin: 0 auto;
    box-sizing: border-box;
  }

  .user-info-container{
    width: 100%;
  }

  .user-info-person{
    display: flex;
    align-items: center;
  }

  .user-info-avatar{
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin-right: 24px;
    overflow: hidden;
    background-color: var(--blur-color);
  }

  .user-info-image{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-info-fullname{
    font-size: 24px;
    font-weight: 800;
    margin: 0 0 24px 0;
  }

  .user-info-username{
    font-size: 18px;
    margin: 0;
  }

  .user-statistic{
    border-top: 1px solid var(--shadow-color);
    margin-top: 24px;
    padding: 12px 0;
    border-bottom: 1px solid var(--shadow-color);
  }

  .statistic-item{
    width: 180px;
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }

  .statistic-ammount{
    font-weight: 800;
  }

  .user-content{
    
  }

  /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {
    .user-layout{
      width: 100%;
      padding: 0 12px;
    }

  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    .user-layout{
      width: 100%;
      padding: 0 12px;
    }
  }

  /* small phone */
  @media (max-width: 480px) {
    .user-layout{
      width: 100%;
      padding: 0 12px;
    }
  }
`