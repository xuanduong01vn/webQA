import styled from 'styled-components';
import React, {useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faBookmark, 
} from '@fortawesome/free-regular-svg-icons';
import {
  faStar as faStared,
  faBookmark as faBookmarked,
  faEllipsis,
  faMound,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../AuthContext.js';
import PostComment from '../PostComment/PostComment.js';


function PostContent(props){

  let { id } = useParams();
  const likePoint=1;
  const markPoint=2;
  const location = useLocation();
  const {onDataReceived, onDeletePost, onIsDeleted} = props;
  const [postData, setPostData] = useState({});
  const [author, setAuthor] = useState({});
  const [amountLiked, setAmountLiked] = useState(0);
  const [amountMarked, setAmountMarked] = useState(0);
  const [engageRate, setEngageRate] = useState(0);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [liked, setLiked] = useState(false);
  const [marked, setMarked] = useState(false);
  const [markedPosts, setMarkedPosts] = useState(null);
  const [likedPosts, setLikedPosts] = useState(null);
  const userToken = useContext(AuthContext);

  useEffect(()=>{
    const getDataPost = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/posts/${id}`);
        return response.data;
      } catch (err) {
        console.log(err.message);
        return {};
      }
    };
    getDataPost()
    .then((data) => {
      setPostData(data);
      onDataReceived({
        title: data.title,
        id: data._id,
        isDeleted: data.isDeleted,});
      setAmountLiked(data.amountLiked);
      setAmountMarked(data.amountMarked);
      setEngageRate(data.engageRate);
    })
    .catch((err)=>{
      console.log(err.message);
    });
  },[onIsDeleted])

  useEffect(()=>{
    const getPost= async(req,res)=>{
      try {
        if(userToken.idCurrentUser){
          const response = await axios.get(`http://localhost:9999/marked/?idAccount=${userToken.idCurrentUser}`);
          return response.data;
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getPost()
    .then(data=>{
      if(data.length!=0){
        setMarkedPosts(data[0]);
      }
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[]);

  useEffect(()=>{
    const getPost= async(req,res)=>{
      try {
        if(userToken.idCurrentUser){
          const response = await axios.get(`http://localhost:9999/liked/?idAccount=${userToken.idCurrentUser}`);
          return response.data;
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getPost()
    .then(data=>{
      if(data.length!=0){
        setLikedPosts(data[0]);
      }
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[]);

  useEffect(()=>{
    if(postData && postData?.idAuthor){
      const getAuthorPost = async () => {
        try {
          const response = await axios.get(`http://localhost:9999/accounts/${postData.idAuthor}`);
          return response.data;
        } catch (err) {
          console.log(err.message);
          return {};
        }
      };
      getAuthorPost()
      .then((data) => {
        setAuthor(data);
      })
      .catch((err)=>{
        console.log(err.message);
      });
    }
  },[postData])

  //handle mark post
  function markPost(){
    if(!markedPosts){
      axios.post(`http://localhost:9999/marked/`,{
        idAccount: userToken.idCurrentUser,
        markedList: [{
          idPost: `${id}`,
          markedAt: new Date(),
        }],
      })
      .then(res=>{
        console.log(res.data);
        setMarkedPosts(res.data);
      })
    }else{
      axios.put(`http://localhost:9999/marked/${markedPosts._id}`,{
        markedList: [...markedPosts.markedList,  
          {
            idPost: `${id}`,
            markedAt: new Date(),
          }],
      })
      .then(res=>{
        console.log(res.data.data);
        setMarkedPosts(res.data.data);
      })
    }
    setAmountMarked(amountMarked+1);
      axios.put(`http://localhost:9999/posts/${id}`,{
        amountMarked: amountMarked+1,
      })
      .then(res=>{
        console.log(res.data);
      })
  }

  function unmarkPost(){
      axios.put(`http://localhost:9999/marked/${markedPosts._id}`,{
        markedList: markedPosts.markedList.filter(p=>p.idPost!=`${id}`),
      })
      .then(res=>{
        console.log(res.data);
        setMarkedPosts(res.data.data);
      })
    setAmountMarked(amountMarked-1);
      axios.put(`http://localhost:9999/posts/${id}`,{
        amountMarked: amountMarked-1,
      })
      .then(res=>{
        console.log(res);
      })
  }

  //handle like post
  function likePost(){
    if(!likedPosts){
      axios.post(`http://localhost:9999/liked/`,{
        idAccount: userToken.idCurrentUser,
        likedList: [{
          idPost: `${id}`,
          likedAt: new Date(),
        }],
      })
      .then(res=>{
        console.log(res.data);
        setLikedPosts(res.data);
      })
    }else{
      axios.put(`http://localhost:9999/liked/${likedPosts._id}`,{
        likedList: [...likedPosts.likedList, 
          {
            idPost: `${id}`,
            likedAt: new Date(),
          }],
      })
      .then(res=>{
        console.log(res.data.data);
        setLikedPosts(res.data.data);
      })
    }
    //tao thong bao moi
    if(postData?.idAuthor!=userToken?.idCurrentUser){
      axios.post(`http://localhost:9999/notify`,{
        idAccountReceive: postData?.idAuthor,
        idAccountSend: userToken?.idCurrentUser,
        contentNotify: `<strong>${userToken?.userLogin?.username}</strong> đã thích bài viết của bạn`,
        notifyAt: new Date(),
        linkNotify: `${location.pathname}`,
        isSeen: false,
        idObject: '',
        typeNotify: 'like',
      })
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err.message);
      })
    }

    axios.get(`http://localhost:9999/accounts/${postData?.idAuthor}`)
    .then(res=>{
      console.log(res.data);
      axios.put(`http://localhost:9999/accounts/${postData?.idAuthor}`,{
        newNotify: res.data.newNotify+1,
      })
      .then(res=>{
        console.log(res.data);
        // userToken.updateNotifyState(res.data.data.newNotify+1);
      })
      .catch(err=>{
        console.log(err.message);
      })
    })
    .catch(err=>{
      console.log(err.message);
    })

    setAmountLiked(amountLiked+1);
    axios.put(`http://localhost:9999/posts/${id}`,{
      amountLiked: amountLiked+1,
      engageRate: engageRate+likePoint,
    })
    .then(res=>{
      console.log(res.data);
    })
  }

  function unlikePost(){
    axios.put(`http://localhost:9999/liked/${likedPosts._id}`,{
      likedList: likedPosts.likedList.filter(p=>p.idPost!=`${id}`),
    })
    .then(res=>{
      console.log(res.data);
      setLikedPosts(res.data.data);
    })

    //xoa thong bao
    if(postData?.idAuthor!=userToken?.idCurrentUser){
      axios.get(`http://localhost:9999/notify/?typeNotify=like&idAccountReceive=${postData?.idAuthor}&idAccountSend=${userToken?.idCurrentUser}`)
      .then(res=>{
        console.log(res.data);
        axios.delete(`http://localhost:9999/notify/${res.data[0]._id}`)
        .then(res=>{
          console.log(res.data);
        })
        .catch(err=>{
          console.log(err.message);
        })
      })
      .catch(err=>{
        console.log(err.message);
      })

      axios.get(`http://localhost:9999/accounts/${postData?.idAuthor}`)
      .then(res=>{
        console.log(res.data);
        if(res.data.newNotify>0){
          axios.put(`http://localhost:9999/accounts/${postData?.idAuthor}`,{
          newNotify: res.data.newNotify-1,
          })
          .then(res=>{
              console.log(res.data);
              // userToken.updateNotifyState(res.data.data.newNotify+1);
          })
          .catch(err=>{
              console.log(err.message);
          })
        }
        
      })
      .catch(err=>{
        console.log(err.message);
      })
    }
    setAmountLiked(amountLiked-1);
    axios.put(`http://localhost:9999/posts/${id}`,{
      amountLiked: amountLiked-1,
      engageRate: engageRate-likePoint,
    })
    .then(res=>{
      console.log(res);
    })
  }

  var timeCreated;
  const now = new Date();

  if(postData?.createAt?.length>0){
    if(now.getFullYear()== new Date(postData.createAt).getFullYear()){
      timeCreated= format(new Date(postData.createAt), 'HH:mm, EEEE, dd MMM', { locale: vi });
    }
    else{
      timeCreated= format(new Date(postData.createAt), 'HH:mm, EEEE, dd MMM yyyy', { locale: vi });
    }
  }


  const popupRef = useRef(null);
  const popupBtnRef = useRef(null);
  //handle open popup edit delete post
  const handleOpenPostPopUp=(e)=>{
    if(popupBtnRef.current && popupBtnRef.current.contains(e.target)){
      setOpenPopUp(!openPopUp);
    }
  }
  
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target) && !popupBtnRef.current.contains(e.target)) {
        setOpenPopUp(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openPopUp]);
  
  return(
    <Wrapper>
      {(postData?.isDeleted === true)
          ?(
            <div className='post-content-not-found'>
              <h1 className='alert-not-found'>Bài viết không còn tồn tại!</h1>
            </div>
          )
        :(postData?.isDeleted === false)
          ?(
            <div className='post-content-all'>
              <div className='post-content-container'>
                <div className='post-content-user'>
                  <div className='post-content-author'>
                    <div className='post-author-avatar'>
                      <img src={author?.avatar} alt='' className='post-author-image'/>
                    </div>
                    <div className='post-content-created'>
                      <a href={`/user/${author?._id}`} className='post-author-name'>{author?.username}</a>
                      <p className='post-created-time'>đã đăng lúc {timeCreated}</p>
                    </div>
                  </div>
                  <div className='post-content-action'>
                    <p className='liked-action-ammount'>{amountLiked}</p>
                    {(likedPosts?.likedList?.find(p=>(p.idPost==id)) && likedPosts)
                      ?
                      <button onClick={unlikePost} className='post-content-action-btn active'>
                        <FontAwesomeIcon icon={faStared}/>
                      </button>
                      :
                      <button onClick={likePost} className='post-content-action-btn'>
                        <FontAwesomeIcon icon={faStar}/>
                      </button>
                    }
                    <p className='marked-action-ammount'>{amountMarked}</p>
                    {(markedPosts?.markedList?.find(p=>p.idPost==id) && markedPosts)
                      ?
                      <button onClick={unmarkPost} className='post-content-action-btn active'>
                        <FontAwesomeIcon icon={faBookmarked}/>
                      </button>
                      :
                      <button onClick={markPost} className='post-content-action-btn'>
                        <FontAwesomeIcon icon={faBookmark}/>
                      </button>
                    }
                      
                    
                  </div>
                </div>
                <h1 className='post-content-title'>
                  {postData.title}
                </h1>
                {postData.idAuthor==userToken.idCurrentUser &&
                  <div className='author-action'>
                    <button ref={popupBtnRef} onClick={(e)=>handleOpenPostPopUp(e)} className='author-action-btn'>
                      <FontAwesomeIcon className='author-action-btn-icon' icon={faEllipsis} />
                    </button>
                      <div ref={popupRef} className={!openPopUp?'author-pop-up':'author-pop-up opened'}>
                        <ul className='author-pop-up-list'>
                          <li className='author-pop-up-item'>
                            <a href={`/post/${postData._id}/edit`} className='author-pop-up-link'>
                              Sửa bài viết
                            </a>
                          </li>
                          <li className='author-pop-up-item'>
                            <a className='author-pop-up-link' 
                            onClick={()=>{
                              setOpenPopUp('author-pop-up');
                              onDeletePost({
                              classParent: 'page-container blur',
                              classChild: 'delete-post-popup',
                            })}}>
                              Xóa bài viết
                            </a>
                          </li>
                        </ul>
                      </div>
                  </div>
                }
                
                <div className='post-content-text' dangerouslySetInnerHTML={{ __html: postData.content}}>
                  {/* <p >
                    {postData.content}
                  </p> */}
                </div>
                <span className='post-tags-item'>
                {postData.listTag?.map((tag)=>(
                      `#${tag} `
                    ))}
                </span>
              </div>
              <PostComment post={postData}/>
            </div>
            )
        :(<div className='post-content-not-found'></div>) 
      }
    </Wrapper>
    )
  }

export default PostContent;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  flex-wrap: wrap;
  box-sizing: border-box;

  .post-content-not-found{
    height: 520px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .post-content-all{
    width: var(--general-width);
    margin: 0;
    box-sizing: border-box;
  }

  .post-content-container{
    width: 100%;
    margin: 0;
    box-sizing: border-box;
  }

  .post-content-user{
    display: flex;
    justify-content: space-between;
  }

  .post-content-author{
    display: flex;
    justify-content: left;
    text-align: left;
  }

  .post-author-avatar{
    height: 48px;
    width: 48px;
    border-radius: 50%;
    margin-right: 12px;
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
    padding: 0;
    color: var(--hightlight-color);
    font-weight: 600;
    font-size: 18px;
  }

  .post-author-name:hover{
    text-decoration: underline;
  }

  .post-created-time{
    margin: 0;
    padding: 0;
    font-size: 14px;
  }

  .post-content-action{
    display: flex;
    justify-content: right;
    align-items: center;
    font-weight: 600;
    font-size: 18px;
    color: var(--shadow-color);
  }

  .post-content-action-btn{
    margin-right: 12px;
    width: 40px;
    height: 40px;
    outline: none;
    border: none;
    background-color: transparent; 
    color: var(--shadow-color);
    cursor: pointer;

    &:hover{
      color: var(--hightlight-color);
    }

    svg{
      height: 60%;
    }
  }
  .post-content-action-btn:last-child{
    margin-right: 0;
  }

  .post-content-title{
    text-align: left;
    display: flex;
  }

  .post-tags-item{
    margin-right: 12px;
    opacity: 0.6;
    font-size: 18px;
    color: var(--hightlight-color);
  }

  .author-action{
    height: 24px;
    width: max-content;
    margin-left: auto;
    display: flex;
    justify-content: right;
    position: relative;
  }

  .author-action-btn{
    height: 24px;

    svg{
      height: 100%;
    }
  }

  .post-content-action-btn.active{
    color: var(--hightlight-color);
  }

  .author-pop-up{
    top: calc(100% + 24px);
    right: 50%;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 0px 2px var(--shadow-color);
    border: 1px solid var(--shadow-color);
    transition: var(--transition-time);
    transform: scaleY(0%) translateX(50%);
    transform-origin: 0 -12px;
    position: absolute;
    z-index: 50;
  }

  .author-pop-up.opened{
    transform: scaleY(100%) translateX(50%);
  }

  .author-pop-up::before{
    content: '';
    z-index: 100;
    display: block;
    border-width: 12px;
    border-style: solid;
    border-color: transparent transparent white transparent;
    position: absolute;
    top: -24px;
    right: 50%;
    transform: translateX(50%);     
  }

  .author-pop-up::after{
    content: '';
    z-index: 99;
    display: block;
    border-width: 13px;
    border-style: solid;
    border-color: transparent transparent var(--shadow-color) transparent;
    position: absolute;
    top: -26px;
    right: 50%;
    transform: translateX(50%);     
  }

  .author-pop-up-list{ 
    list-style: none;
    padding: 0;
    margin: 0;
    width: max-content;
  }

  .author-pop-up-item{
    height: max-content;
    font-size: 16px;
    text-align: left;
    display: flex;
    align-items: center;
    margin: 0;
    font-weight: 500;
  }

  .author-pop-up-item:last-child{
    border-bottom: 0;
  }

  .author-pop-up-link{
    width: 100%;
    padding: 12px;
    transition: var(--transition-time);
    color: var(--text-color);
  }

  .author-pop-up-link:hover{
    color: var(--hightlight-color);
    background-color: var(--primary-color);
  }

  /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {
    display: block;

    .post-content-all{
      width: 100%;
      padding: 0 12px;
    }

    .author-pop-up{
      right: 0;
      transform: scaleY(0%) translateX(0);
    }

    .author-pop-up.opened{
      transform: scaleY(100%) translateX(0);
    }

    .author-pop-up::before{
      content: '';
      right: 16px;
    }

    .author-pop-up::after{
      content: '';
      right: 16px;  
    }

  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    display: block;
    
    .post-content-all{
      width: 100%;
      padding: 0 12px;
    }

    .author-pop-up{
      right: 0;
      transform: scaleY(0%) translateX(0);
    }

    .author-pop-up.opened{
      transform: scaleY(100%) translateX(0);
    }

    .author-pop-up::before{
      content: '';
      right: 16px;
    }

    .author-pop-up::after{
      content: '';
      right: 16px;  
    }
  }

  /* small phone */
  @media (max-width: 480px) {
    display: block;
    
    .post-content-all{
      width: 100%;
      padding: 0 12px;
    }

    .author-pop-up{
      right: 0;
      transform: scaleY(0%) translateX(0);
    }

    .author-pop-up.opened{
      transform: scaleY(100%) translateX(0);
    }

    .author-pop-up::before{
      content: '';
      right: 16px;
    }

    .author-pop-up::after{
      content: '';
      right: 16px;  
    }
  }

`