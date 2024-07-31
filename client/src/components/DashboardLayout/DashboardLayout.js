import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown,
  faHouse,
  faFile,
  faPen,
  faQuestion,
  faAddressCard,
  faUserGear,
  faUser,
  faHashtag,
  faComment,
  faPerson,
 } from '@fortawesome/free-solid-svg-icons';

 function DashboardLayout(props){
  var {title} = props;
  const [openedLowMenu, setOpenedLowMenu] = useState(title);

  useEffect(()=>{
    if(title=='post'){
      setOpenedLowMenu('post');
    }
    else if(title=='admin'){
      setOpenedLowMenu('admin');
    }
    else if(title=='user'){
      setOpenedLowMenu('user');
    }
    else{
      setOpenedLowMenu(null);
    }
  },[title]);
  

  const handleOpenLowMenu = (menu) => {
    setOpenedLowMenu(openedLowMenu==menu?null:menu)
  };

  // const handleOpenLowMenu=(e)=>{
  //   if(!openedLowMenu){
  //     setOpenedLowMenu(true);
  //     setOpenMenuIcon('opened-menu-icon opened');
  //   }
  //   else{
  //     setOpenedLowMenu(false);
  //     setOpenMenuIcon('opened-menu-icon');
  //   }
  // }

  return(
    <Wrapper>
      <ul className='top-menu'>
      <li className='top-menu-item'>
        <Link to='/dashboard/' className={title=='dashboard'?'menu-item-link active':'menu-item-link'}>
          <FontAwesomeIcon icon={faHouse} />Tổng quan
        </Link>
      </li>
        <li className='top-menu-item'>
          <button onClick={() => handleOpenLowMenu('post')} className='top-menu-down'>
            <FontAwesomeIcon icon={faPen} />Bài viết
            <span className={(openedLowMenu=='post')?'opened-menu-icon opened':'opened-menu-icon'} >
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
            
          </button>
          
          {(openedLowMenu=='post') &&
            <ul className='low-menu'>
            <li className='low-menu-item'>
              <Link to='/dashboard/posts/' className={title=='post'?'menu-item-link active':'menu-item-link'}>
              Bài viết
              </Link>
            </li>
            {/* <li className='low-menu-item'>
              <a href='/dashboard/questions' className='menu-item-link'>
              <FontAwesomeIcon icon={faQuestion} />Câu hỏi
              </a>
            </li> */}
          </ul>
          }
          
        </li>
        <li className='top-menu-item'>
          <button onClick={() => handleOpenLowMenu('admin')} className='top-menu-down'>
              <FontAwesomeIcon icon={faUser} />Tài khoản
            <span className={(openedLowMenu=='admin' || openedLowMenu=='user')?'opened-menu-icon opened':'opened-menu-icon'}>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
            
          </button>
          {(openedLowMenu=='admin' || openedLowMenu=='user') &&
            <ul className='low-menu'>
            <li className='low-menu-item'>
              <Link to='/dashboard/admins/' className={title=='admin'?'menu-item-link active':'menu-item-link'}>
              Quản trị viên
              </Link>
            </li>
            <li className='low-menu-item'>
              <Link to='/dashboard/users/' className={title=='user'?'menu-item-link active':'menu-item-link'}>
              Người dùng
              </Link>
            </li>
          </ul>
          }
        </li>
        <li className='top-menu-item'>
          <Link to='/dashboard/comments/' className={title=='comment'?'menu-item-link active':'menu-item-link'}>
            <FontAwesomeIcon icon={faComment} />Bình luận
          </Link>
        </li>
        <li className='top-menu-item'>
          <Link to='/dashboard/tags/' className={title=='tag'?'menu-item-link active':'menu-item-link'}>
            <FontAwesomeIcon icon={faHashtag} />Gắn nhãn
          </Link>
        </li>
      </ul>
    </Wrapper>
  )
 }

 export default DashboardLayout;

 const Wrapper = styled.div`
  min-width: 240px;
  background-color: var(--primary-color);
  height: calc(100vh - 60px);
  box-sizing: border-box;

  ul{
    list-style: none;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    transition: var(--transiton-time);
  }

  .low-menu{
    padding: 0 24px;
  }

  
  li{
    width: 100%;
    box-sizing: border-box;
    color: var(--text-color);
  }

  .top-menu-down:hover,
  .menu-item-link:hover
  {
    background-color: var(--blur-color);
    color: var(--text-color);
  }

  .menu-item-link{
    padding: 12px 24px;
    display: block;
    height: 100%;
    border-radius: 8px;
    color: var(--text-color);
    font-weight: 600;
  }

  .menu-item-link.active{
    color: var(--hightlight-color);
    background-color: var(--blur-color);
    font-weight: 800;
  }

  .top-menu-down{
    font-size: 16px;
    position: relative;
    width: 100%;
    text-align: left;
    padding: 12px 24px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    display: flex;
    align-items: center;
  }

  svg{
    margin-right: 8px;
    width: 16px;
  }

  .opened-menu-icon{
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%) rotateX(0deg);
    transition: var(--transiton-time);
    display: flex;
    align-self: center;
  }

  .opened-menu-icon.opened{
    transform: translateY(-50%) rotateX(180deg);
  }
  
 `