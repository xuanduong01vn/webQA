import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.js';
import HeaderDashboard from '../../components/Header/HeaderDashboard';
import Footer from '../../components/Footer/Footer.js';
import PostContent from '../../components/PostContent/PostContent.js';
import { AuthContext } from '../../AuthContext';

function ReadPost(){
  const authToken = useContext(AuthContext);
  const [post, setPost] = useState({
    title: '',
    id: '',
    isDeleted: '',
  });
  const [classPopup, setClassPopup] = useState({
    classParent: 'page-container',
    classChild: 'delete-post-popup hide',
  });
  const navigate = useNavigate();

  document.title=post.title;

  const handlePost = (post) => {
    setPost(post);
  };

  const handleOpenPopup = (classPopup) => {
    setClassPopup(classPopup);
  };

  const handleCancelDelete = () => {
    setClassPopup({
      classParent: 'page-container',
      classChild: 'delete-post-popup hide',
    });
  };

  const handleDeletePost = ()=>{
    axios.put(`http://localhost:9999/posts/${post.id}`,{
      isDeleted: true,
    })
    .then(res=>{
      console.log(res.data);
      setPost({
        ...post,
        isDeleted: true,
      })
      handleCancelDelete();
    })
    .catch(err=>{
      console.log(err.message);
    })
  }

  
  return (
    <Wrapper>
      <div className={classPopup.classParent}>
        <div className={classPopup.classChild}>
          <div className='pop-up-container'>
            <span>Bạn chắc chắn muốn xóa bài viết này?</span>
            <div className='btn-list'>
              <button onClick={handleCancelDelete} className='delete-btn'>Hủy</button>
              <button onClick={handleDeletePost} className='delete-btn active'>Đồng ý</button>
            </div>
          </div>
        </div>
        {authToken?.userLogin?.idTypeAccount==1 
        ?(<HeaderDashboard/>)
        :(<Header/>)
      }
        <div className='content-section'>
          <PostContent onDataReceived={handlePost} onDeletePost={handleOpenPopup} onIsDeleted={post.isDeleted}/>
        </div>
        <Footer/>
      </div>
    </Wrapper>
  )
}

export default ReadPost;

const Wrapper = styled.div`

  .page-container{
    position: relative;
    max-height: 100%;
    width: 100%;
  }
  
  .page-container.blur{
    position: fixed;
  }

  .delete-post-popup.hide{
    display: none;
  }

  .delete-post-popup{
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.2);
    z-index: 999;
    top:0;
    left: 0;
    right:0;
    bottom: 0;
    justify-content: center;
    align-items: center;
  }

  .pop-up-container{
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 0 10px var(--text-color);
  }

  .btn-list{
    margin-top: 12px;
    display: flex;
    justify-content: right;
  }

  .delete-btn{
    border: 1px solid var(--shadow-color);
    background: var(--primary-color);
    padding: 8px;
    min-width: 64px;
    box-sizing: border-box;
    border-radius: 4px;
    margin-left: 12px;
    transition: var(--transition-time);

    &:hover{
      border: 1px solid var(--hightlight-color);
      background: var(--hightlight-color);
      color: white;
      opacity: 0.6;
    }
  }

  .delete-btn.active{
    border: 1px solid var(--hightlight-color);
    background: var(--hightlight-color);
    color: white;
  }

  .content-section{
    margin-top: 80px;
  }
`