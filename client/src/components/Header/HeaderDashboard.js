import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef, useContext } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,
          faPen,
          faBell
 } from '@fortawesome/free-solid-svg-icons';
 import { AuthContext } from '../../AuthContext';

function HeaderAdmin(){

  const [openInput, setOpenInput] = useState(false);
  const [namePopup, setNamePopup] = useState(null);
  const [searchText, setSearchText] = useState('');
  const currentToken = useContext(AuthContext);

  const inputRef = useRef();
  const popupRefs = useRef({});
  const btnRefs = useRef({});

  function handleSearchClick(text){

  }

  function onChangeValue(value){
    console.log(value);
  }

  //handle open search box in mobile screen
  const handleOpenSearchBox =()=>{
    if(!openInput)
      setOpenInput(true);
  }
  //handle close search box in mobile screen
  const handleCloseSearchBox =()=>{
    if(openInput)
      setOpenInput(false);
  }

  function handleLogOut(){
    Cookies.set('iduser','')
    Cookies.set('user','')
    Cookies.set('token','')
  }

  useEffect(() => {
    function handleClickOutside(e) {
      var looped=0;
      Object.keys(btnRefs.current).forEach(btn => {
        if(btnRefs.current[btn].contains(e.target)){
          ++looped;
          if(!namePopup){
            setNamePopup(btn)
          }
          if(namePopup && namePopup!=btn){
            setNamePopup(btn)
          }
          if(namePopup && namePopup==btn){
            if(Object.keys(popupRefs.current).every(popup=>
              !popupRefs.current[popup].contains(e.target)
            )){
              setNamePopup(null)
            }
            else{
              setNamePopup(btn)
            }
          }
        }
        if(looped==0){
          setNamePopup(null);
        }
      });
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [namePopup]);

  function handleLogOut(){
    Cookies.remove('iduser')
    Cookies.remove('token')
  }

    return (    
        <Wrapper>
          <div className='header-container'>
            <div className='header-bar'>
              <Link to='/' className='header-title'>QAx</Link>
              <div id='search-container'>
                <input id='search-box' type='text' placeholder='Tìm kiếm trên QAx'/>
                <button id='search-btn'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                </button>
              </div> 
              <div className='user-container'>
                <div className='user-container-item'>
                  <button ref={el => (btnRefs.current['create'] = el)} className='new-blog-btn user-btn'>
                    <FontAwesomeIcon icon={faPen} className='new-blog-icon user-container-icon'/>
                      <div ref={el => (popupRefs.current['create'] = el)} className={namePopup=='create'?'header-pop-up-open':'header-pop-up'}>
                        <ul className='header-pop-up-list'>
                          <li className='header-pop-up-item'>
                            <Link to={currentToken.idCurrentUser?'/create/post':'/login'} className='header-pop-up-link create-blog'>
                              Tạo bài viết
                            </Link>
                          </li>
                          <li className='header-pop-up-item'>
                            <Link to='/create/question' className='header-pop-up-link create-question'>
                              Đặt câu hỏi
                            </Link>
                          </li>
                        </ul>
                      </div>
                  </button>
                </div>
                <div className='user-container-item'>
                  <button className='notify-btn user-btn'>
                    <FontAwesomeIcon icon={faBell} className='notify-icon user-container-icon'/>
                    <div className='notify-alert'>
                      <p className='notify-alert-amount'>68</p>
                    </div>
                  </button>
                </div>
                <div className='user-container-item'>
                  <button ref={el => (btnRefs.current['user'] = el)} className='user-bar user-btn'>
                    <div className='user-avatar'>
                      <img src={currentToken.userLogin?.avatar} alt='user avatar' className='user-image'/>
                    </div>
                    <p className='user-name'>{currentToken.userLogin?.username}</p>
                      <div ref={el => (popupRefs.current['user'] = el)} className={namePopup=='user'?'header-pop-up-open':'header-pop-up'}>
                      <ul className='header-pop-up-list'>
                        <li className='header-pop-up-item'>
                          <Link to='/account/profile' className='header-pop-up-link user-profile'>
                            Trang cá nhân
                          </Link>
                        </li>
                        <li className='header-pop-up-item'>
                          <Link to={`/user/${currentToken.idCurrentUser}`} className='header-pop-up-link blog-manage'>
                            Trang hoạt động
                          </Link>
                        </li>
                        <li className='header-pop-up-item'>
                          <Link to='/account/post' className='header-pop-up-link blog-manage'>
                            Quản lý bài viết
                          </Link>
                        </li>
                        <li className='header-pop-up-item'>
                          <Link to='/' onClick={handleLogOut} className='header-pop-up-link log-out'>
                            Đăng xuất
                          </Link>
                        </li>
                      </ul>
                    </div>
                    
                  </button>
                </div>
              </div>
            </div>
          </div>                                    
        </Wrapper>
    )
}

export default HeaderAdmin;

const Wrapper = styled.div`
  .header-container{
    width: 100%;
    height: 60px;
    background-color: var(--primary-color);
    margin-bottom: 40px;
    position: fixed;
    top: 0;
    box-shadow: 0 0 10px var(--shadow-color);
    z-index: 98;
  }

  .header-search-bar{
    width: 100%;
    position: absolute;
    z-index: 101;
    height: 60px;
    display: flex;
    box-sizing: border-box;
  }

  .header-search-box{
    background-color: white;
    text-align: left;
    align-items: center;
    border-radius: 0;
    height: 100%;
    width: 100%;
    padding: 12px 38px 12px 24px;
  }

  #search-cancel-btn{
    position: absolute;
    right: 12px;
    height: 36px;
    width: 36px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 102;

    & svg{
      width: 100%;
      height: 100%;
      transition: var(--transition-time);
    }
  }

  #search-cancel-btn:hover svg{
    color: var(--shadow-color);
  }

  .header-bar{
    width: var(--general-width);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .header-title{
    color: var(--shadow-color);
    font-size: 40px;
    font-weight: 800;
    text-shadow: 
      -1px -1px 0 var(--text-color),  
      1px -1px 0 var(--text-color),
      -1px 1px 0 var(--text-color),
      1px 1px 0 var(--text-color);
  }

  #search-container{
    border-radius: 18px;
    width: max-content; 
    min-width: 36px;
    height: 36px;
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    align-items: center;
  }

  #search-box{
    border-radius: 18px;
    border: 2px solid var(--shadow-color);
    width: 400px; 
    outline: none;
    padding: 8px 36px 8px 24px;
    font-size: 16px;
    background-color: white;
  }

  #search-box-open{
    width: 100%; 
    outline: none;
    padding: 8px 36px 8px 24px;
    font-size: 16px;
    background-color: white;
  }

  #search-container button{
    position: absolute;
    right: 0;
    border: none;
    height: 36px;
    width: 36px;
    background-color: transparent;
  }

  #search-container button svg{
    height: 20px;
    transition: var(--transition-time);
  }

  #search-container button:hover svg{
    height: 20px;
    color: var(--shadow-color);
  }

  #search-btn{
    display: block;
  }

  #search-header-btn{
      display: none;
    }

  #sign-btn{
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    transition: var(--transition-time);
  }

  #sign-btn:hover{
    color: var(--hightlight-color);
  }

  .user-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .user-container-item{
    position: relative;
    margin-right: 18px;
    width: max-content;
    height: max-content;
  }

  .user-container-item:last-child{
    margin-right: 0;
  }

  .user-btn{
    width: 30px;
    height: 30px;
    cursor: pointer;
    outline: 0;
    border: 0;
    background-color: transparent;
  }

  .user-btn:hover >svg, 
  .user-btn:hover >p{
    color: var(--shadow-color);
  }

  .notify-btn{
    position: relative;
  }

  .notify-alert{
    position: absolute;
    top: -4px;
    left: 12px;
    background-color: var(--hightlight-color);
    color: var(--primary-color);
    width: max-content;
    height: 18px;
    min-width: 18px;
    padding: 2px 4px;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border: 1px solid var(--primary-color);
    box-sizing: border-box;
  }

  .notify-alert-amount{
    width: max-content;
    height: max-content;
  }

  .user-container-icon{
    color: var(--text-color);
    height: 100%;
    width: 100%;
  }

  .user-bar{
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 0;
    width: max-content;
    padding-right: 0;
    min-width: 140px;
    text-align: left;
  }

  .user-avatar{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 6px;
    overflow: hidden;
  }

  .user-image{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-name{
    font-size: 16px;
    color: var(--text-color);
  }

  .header-pop-up,
  .header-pop-up-open{
    position: absolute;
    z-index: 99;
    top: calc(100%);
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 0px 2px var(--shadow-color);
    border: 1px solid var(--shadow-color);
    transition: var(--transition-time);
    transform-origin: 0 -12px;
    right: 0;
  }

  
  .header-pop-up{
    transform: scaleY(0%) translateX(0);
  }

  .header-pop-up-open{
    transform: scaleY(100%) translateX(0);
  }


  .header-pop-up::before,
  .header-pop-up-open::before{
    content: '';
    z-index: 100;
    display: block;
    border-width: 12px;
    border-style: solid;
    border-color: transparent transparent white transparent;
    position: absolute;
    top: -24px;
    right: 10px;       
  }

  .header-pop-up::after,
  .header-pop-up-open::after{
    content: '';
    z-index: 99;
    display: block;
    border-width: 13px;
    border-style: solid;
    border-color: transparent transparent var(--shadow-color) transparent;
    position: absolute;
    top: -26px;
    right: 9px;       
  }

  .header-pop-up-list{
    list-style: none;
  }

  .header-pop-up-list{ 
    list-style: none;
    padding: 0;
    margin: 0;
    width: max-content;
  }

  .header-pop-up-item{
    height: max-content;
    font-size: 16px;
    text-align: left;
    display: flex;
    align-items: center;
    margin: 0;
  }

  .header-pop-up-item:last-child{
    border-bottom: 0;
  }

  .header-pop-up-link{
    width: 100%;
    padding: 12px 40px 12px 12px;
    transition: var(--transition-time);
    color: var(--text-color);
  }

  .header-pop-up-link:hover{
    color: var(--hightlight-color);
    background-color: var(--primary-color);
  }

`