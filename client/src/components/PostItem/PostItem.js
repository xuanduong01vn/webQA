import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  
} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark as faBookmarked,
  faStar,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

// PostItem.propTypes={
//   post: propTypes.shape({
//     _id: propTypes.string.isRequired,
//     title: propTypes.string.isRequired,
//     idAuthor: propTypes.string.isRequired,
//     createAt: propTypes.string.isRequired,
//     listTag: propTypes.array,
//     amountLiked: propTypes.number,
//     amountMarked: propTypes.number,
//     amountComment: propTypes.number,
//   }).isRequired,
//   author: propTypes.shape({
//     _id: propTypes.string.isRequired,
//     username: propTypes.string.isRequired,
//     avatar: propTypes.string.isRequired,
//   }).isRequired,
// };

// PostItem.defaultProps={
//   post: {
//     _id: '',
//     title: '',
//     idAuthor: '',
//     createAt: '',
//     listTag: [],
//     amountLiked: 0,
//     amountMarked: 0,
//     amountComment: 0,
//   },
//   author: {
//     _id: '',
//     username: '',
//     avatar: '',
//   },
// };

function PostItem(props){

  const { post, author } = props;

  const [marked, setMarked]=useState(false);
  function clickMark(e){
    if(marked==false)
      setMarked(true);
    else
      setMarked(false);
  }

  var timeCreated;
  const now = new Date();
  if(now.getFullYear()== new Date(post.createAt).getFullYear()){
    timeCreated= format(new Date(post.createAt), 'HH:mm, EEEE, dd MMM', { locale: vi });
  }
  else{
    timeCreated= format(new Date(post.createAt), 'HH:mm, EEEE, dd MMM yyyy', { locale: vi });
  }

  return(
    <Wrapper>
      <div className='post-item-cover'>
        <div className='post-item-user'>
          <div className='post-item-author'>
            <Link to={`/user/${author?._id}`} className='post-item-author-info'>
              <div className='post-author-avatar'>
                <img src={author?.avatar} alt='' className='post-author-image'/>
              </div>
              <p className='post-author-name'>{author?.username}</p>
            </Link>
            <span className='post-item-author-create'>{timeCreated}</span>
          </div>
          {/* <div className='post-item-action'>
            <button onClick={clickMark} className='add-blog post-item-btn'>
              {!marked && <FontAwesomeIcon className='post-item-btn-mark' icon={faBookmark} />}
              {marked && <FontAwesomeIcon className='post-item-btn-marked' icon={faBookmarked} />}
            </button>
          </div> */}
        </div>
        <Link to={`/post/${post._id}`} className='post-item-title'>
          <h3>{ post.title}</h3> 
        </Link>
        <ul className='post-tags'>
          {post.listTag.map((tag, index)=>(
            <li key={index} className='post-tags-item'>#{tag}</li>
          ))}
        </ul>
        <div className='post-item-interact'>
          <div className='post-item-stars'>
            <FontAwesomeIcon icon={faStar} />{post.amountLiked}
          </div>
          <div className='post-item-comments'>
            <FontAwesomeIcon icon={faComment} />{post.amountComment}
          </div>
          <div className='post-item-marks'>
            <FontAwesomeIcon icon={faBookmarked} />{post.amountMarked}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default PostItem;

const Wrapper = styled.div`
  .post-item-cover{
    border: 1px solid var(--shadow-color);
    border-radius: 12px; 
    padding: 12px;
  }

  .post-item-user{
    display: flex;
    justify-content: space-between;
  }

  .post-item-author{
    display: flex;
    text-align: center;
    align-items: center;
    font-weight: 600;
  }

  .post-item-author-info{
    margin-right: 4px;
    display: flex;
    text-align: center;
    align-items: center;
    font-weight: 600;

    .post-author-avatar{
      width: 32px;
      height: 32px;
      border-radius: 50%; 
      margin-right: 6px;
      overflow: hidden;
      background-color: var(--blur-color);
    }  
    
    .post-author-image{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .post-author-name{
      margin: 0;
      color: var(--hightlight-color);
    } 

    &:hover .post-author-name{
        text-decoration: underline;
    } 
  }

  .post-item-author-create{
    margin: 0;
    font-size: 14px;
    display: flex;
    text-align: left;
    align-items: center;
  }

  .post-item-btn{
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




  .post-item-title{

    h3{
      margin: 8px 0;
      color: var(--text-color);
      transition: var(--transition-time);
    }

    &:hover h3{
      color: var(--hightlight-color);
    }
  }

  .post-tags{
    display: flex;
  }

  .post-tags-item{
    margin-right: 4px;
    font-size: 14px;
    opacity: 0.6;
    color: var(--hightlight-color);
  }

  .post-item-interact{
    display: flex;
    margin-top: 12px;
    font-size: 14px;
    color: var(--shadow-color);
    
    &>div{
      margin-right: 20px;
    }

    & svg{
      margin-right: 4px;
    }
  }


  @media (max-width: 480px) {
    .post-item-author{
      display: block;
    }
  }
`

