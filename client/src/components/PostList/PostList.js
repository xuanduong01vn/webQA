import React, {useEffect, useState} from "react";
import styled from 'styled-components';

import BlogItem from "../PostItem/PostItem";



function BlogList(){

  const [noBlog,SetNoBlog] = useState(false);

  return(
    <Wrapper>
      <div id="blog-list-container">
        <h2 className="blog-container-title">Danh sách bài viết</h2>
        {noBlog&&
          <div className="blog-list-alert">
            <span>Chưa có bài viết nào</span>
          </div>
        }
        {!noBlog &&
          <ul className="blog-list-box">
            <li className="blog-item">
              <BlogItem/>
            </li>
            
          </ul>
        }
        
      </div>
    </Wrapper>
  )
}

export default BlogList;

const Wrapper = styled.div`
  width: 70%;
  height: max-content;
  box-sizing: border-box;
  margin-right: 18px;
  text-align: left;

  .blog-list-box{
    list-style: none;
    margin: 0%;
    padding: 0;
  }

  .blog-list-alert{
    width: 100%;
    border: 1px solid var(--shadow-color);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    font-size: 24px;
    color: var(--shadow-color);
  }

  .blog-item{
    margin-bottom: 16px;

    &:last-child{
      margin-bottom: 0;
    }
  }

  /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {
    width: 60%;

  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    min-width: 100%;
    margin-right: 0;
  }

  /* small phone */
  @media (max-width: 480px) {
    min-width: 100%;
    margin-right: 0;
  }
  

  
`