import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  
} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark as faBookmarked,
  faStar,
  faComment,
} from '@fortawesome/free-solid-svg-icons';



function BlogList(){

  const [marked, setMarked]=useState(false);
  function clickMark(e){
    if(marked==false)
      setMarked(true);
    else
      setMarked(false);
  }

  return(
    <Wrapper>
      <div id="blog-list-container">
        <h2 className="blog-container-title">Danh sách bài viết</h2>
        <ul className="blog-list-box">
          <li className="blog-item">
            <div className="blog-item-cover">
              <div className="blog-item-user">
                <div className="blog-item-author">
                  <a href="" className="blog-item-author-info">
                    <img src="https://www.vietnamfineart.com.vn/wp-content/uploads/2023/07/anh-avatar-dep-cho-con-gai-1.jpg" 
                    alt="" className="blog-author-avatar" />
                    <p className="blog-author-name">xuanduong</p>
                  </a>
                  <p className="blog-item-author-create">2022.2.3</p>
                </div>
                <div className="blog-item-action">
                  <button onClick={clickMark} className="add-blog blog-item-btn">
                    {!marked && <FontAwesomeIcon className="blog-item-btn-mark" icon={faBookmark} />}
                    {marked && <FontAwesomeIcon className="blog-item-btn-marked" icon={faBookmarked} />}
                  </button>
                </div>
              </div>
              <a href="" className="blog-item-title">
                <h3>React basic basicReact basic basicReact basic basicReact basic basicReact basic basicReact basic basicReact basic basic</h3> 
              </a>
              
              <div className="blog-item-interact">
                <div className="blog-item-stars">
                  <FontAwesomeIcon icon={faStar} />6
                </div>
                <div className="blog-item-comments">
                  <FontAwesomeIcon icon={faComment} />6
                </div>
                <div className="blog-item-marks">
                  <FontAwesomeIcon icon={faBookmarked} />8
                </div>
              </div>
            </div>
          </li>
          <li className="blog-item">
            <div className="blog-item-cover">
              <div className="blog-item-user">
                <div className="blog-item-author">
                  <a href="" className="blog-item-author-info">
                    <img src="https://www.vietnamfineart.com.vn/wp-content/uploads/2023/07/anh-avatar-dep-cho-con-gai-1.jpg" 
                    alt="" className="blog-author-avatar" />
                    <p className="blog-author-name">xuanduong</p>
                  </a>
                  <p className="blog-item-author-create">2022.2.3</p>
                </div>
                <div className="blog-item-action">
                  <button onClick={clickMark} className="add-blog blog-item-btn">
                    {!marked && <FontAwesomeIcon className="blog-item-btn-mark" icon={faBookmark} />}
                    {marked && <FontAwesomeIcon className="blog-item-btn-marked" icon={faBookmarked} />}
                  </button>
                </div>
              </div>
              <a className="blog-item-title">
                <h3>React basic basicReact basic basicReact basic basicReact basic basicReact basic basicReact basic basicReact basic basic</h3> 
              </a>
              
              <div className="blog-item-interact">
                <div className="blog-item-stars">
                  <FontAwesomeIcon icon={faStar} />6
                </div>
                <div className="blog-item-comments">
                  <FontAwesomeIcon icon={faComment} />6
                </div>
                <div className="blog-item-marks">
                  <FontAwesomeIcon icon={faBookmarked} />8
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Wrapper>
  )
}

export default BlogList;

const Wrapper = styled.div`
  width: 70%;
  min-height: 600px;
  height: max-content;
  text-align: left;

  .blog-list-box{
    list-style: none;
    margin: 0%;
    padding: 0;
  }

  .blog-item{
    margin-bottom: 16px;

    &:last-child{
      margin-bottom: 0;
    }
  }

  .blog-item-cover{
    border: 1px solid var(--shadow-color);
    border-radius: 12px; 
    padding: 12px;
  }

  .blog-item-user{
    display: flex;
    justify-content: space-between;
  }

  .blog-item-author{
    display: flex;
    text-align: center;
    align-items: center;
    font-weight: 600;
  }

  .blog-item-author-info{
    margin-right: 24px;
    display: flex;
    text-align: center;
    align-items: center;
    font-weight: 600;

    .blog-author-avatar{
      width: 32px;
      height: 32px;
      border-radius: 50%; 
      margin-right: 12px;
    }  

    .blog-author-name{
      margin: 0;
      color: var(--shadow-color);
    } 

    &:hover .blog-author-name{
        text-decoration: underline;
    } 
  }

  .blog-item-author-create{
    margin: 0;
    font-size: 14px;
    display: flex;
    text-align: center;
    align-items: center;
  }

  .blog-item-btn{
    outline: none;
    border: none;
    background: transparent;
    width: 24px;
    height: 24px;
    cursor: pointer;

    & > svg{
      height: 100%;
      color: var(--shadow-color);
    }
  }

  .blog-item-title{

    h3{
      margin: 8px 0;
      color: var(--text-color);
      transition: var(--transition-time);
    }

    &:hover h3{
      color: var(--shadow-color);
    }
  }

  .blog-item-interact{
    display: flex;
    margin-top: 12px;
    color: var(--shadow-color);
    font-size: 14px;
    
    &>div{
      margin-right: 20px;
    }

    & svg{
      margin-right: 4px;
    }
  }

  
`