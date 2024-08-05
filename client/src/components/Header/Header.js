import styled from 'styled-components';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import axios from 'axios';
import { format, longFormatters } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,
          faPen,
          faBell,
          faXmark,
 } from '@fortawesome/free-solid-svg-icons';
 import { AuthContext } from '../../AuthContext';

function Header(){
  const location = useLocation();
  const navigate = useNavigate();
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
  const queryParams = getQueryParams(location.search);
  var isSearch = queryParams.get('search');

  const [openInput, setOpenInput] = useState(false);
  const [namePopup, setNamePopup] = useState(null);
  const [userNotify, setUserNotify] = useState(null);
  const [searchText, setSearchText] = useState(isSearch || '');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const currentToken = useContext(AuthContext);
  const [amountNotify, setAmountNotify] = useState(null);

  const inputRef = useRef(null);
  const popupRefs = useRef({});
  const btnRefs = useRef({});

  const [amountSeen, setAmountSeen] = useState(null);

  useEffect(()=>{
    if(currentToken?.idCurrentUser){
      const getNotify = async(req,res)=>{
        try {
          const response = await axios.get(`http://localhost:9999/notify?idAccountReceive=${currentToken?.idCurrentUser}&sort=notifyAt`);
          return response.data;
          
        } catch (err) {
          console.log(err.message);
        }
      }
    getNotify()
    .then(data=>{
      setUserNotify(data);
    })
    .catch(err=>{
      console.log(err.message);
    })
    }
  },[amountSeen]);

  useEffect(()=>{
    if(currentToken?.idCurrentUser){
      const getNotify = async(req,res)=>{
        try {
          const response = await axios.get(`http://localhost:9999/notify?idAccountReceive=${currentToken?.idCurrentUser}&isSeen=true`);
          return response.data;
          
        } catch (err) {
          console.log(err.message);
        }
      }
    getNotify()
    .then(data=>{
      setAmountSeen(data);
    })
    .catch(err=>{
      console.log(err.message);
    })
    }
  },[]);

  useEffect(()=>{
    setAmountNotify(currentToken?.userLogin?.newNotify);
  },[]);

  function handleSearchKey(){
    if(searchText.trim().length>0){
      queryParams.set('search', searchText.trim());
      navigate(
        {
          pathname: location.pathname,
          search: queryParams.toString(),
        }
      )
    }
  }

  useEffect(()=>{
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Thêm sự kiện lắng nghe khi cửa sổ thay đổi kích thước
    window.addEventListener('resize', handleResize);

    // Xóa sự kiện khi component bị unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchKey();
    }
  };

  function onChangeValue(e){
    setSearchText(e.target.value);
  }

  //handle open search box in mobile screen
  function handleOpenSearchBox(){
    setOpenInput(true);
    inputRef.current.focus();
    inputRef.current.setSelectionRange(0,0);
  }
  //handle close search box in mobile screen
  function handleCloseSearchBox(){
    setOpenInput(false);
    setSearchText('');
  }

  function openNotifyBox(){
    if(amountNotify>0){
      currentToken.updateNotifyState(0);
      setAmountNotify(0);
      axios.put(`http://localhost:9999/accounts/${currentToken?.idCurrentUser}`,{
        newNotify: 0,
    })
    .then(res=>{
      console.log(res.data);
    })
    .catch(err=>{
      console.log(err.message);
    })
    }
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

  function seeNotify(e){
    // console.log(e);
    // e.scrollIntoView({ behavior: 'smooth' });
    console.log(userNotify?.find(n=>n._id==e?.getAttribute('name'))?.isSeen);
    if(userNotify?.find(n=>n._id==e?.getAttribute('name'))?.isSeen==false){
      axios.put(`http://localhost:9999/notify/${e?.getAttribute('name')}`,{
        isSeen: true,
      })
      .then(res=>{
        console.log(res.data);
        setAmountSeen(amountSeen+1);
      })
      .catch(err=>{
        console.log(err.message);
      })

      
    }
    setNamePopup(null);
  }

  const now = new Date();
  function formatTime(time){  
    if(time?.length>0){
      if(now.getFullYear()== new Date(time).getFullYear()){
        return format(new Date(time), 'HH:mm, dd MMM', { locale: vi });
      }
      else{
        return format(new Date(time), 'HH:mm, dd MMM yyyy', { locale: vi });
      }
    }
  }

    return (    
        <Wrapper>
          <div className='header-container'>
            <div className='header-bar'>
              <Link to='/' className='header-title'>QAx</Link>
              <div className={(window.innerWidth<=768 && (openInput || searchText.trim().length>0))?'search-container mobile':'search-container'}>
                  <input ref={inputRef}
                  id='search-box' 
                  type='text' placeholder='Tìm kiếm trên QAx'
                  value = {searchText} 
                  autoComplete='off'
                  onChange={e=>{onChangeValue(e)}}
                  onKeyDown={handleKeyDown}/>
                  
                  <button onClick={handleSearchKey} className={searchText.trim().length>0?'search-btn':'search-btn disable'}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                  </button>
                  {(window.innerWidth<=768 && (openInput || searchText.trim().length>0)) && 
                    <button onClick={handleCloseSearchBox} id='search-cancel-btn'>
                    <FontAwesomeIcon icon={faXmark} className='search-cancel-icon' />
                  </button>}
                  {((window.innerWidth<=768 && searchText.trim().length==0) && !openInput) && 
                    <button onClick={handleOpenSearchBox} className='search-header-btn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                  </button>}
              </div> 
              <div className='user-container'>
                <div className='user-container-item'>
                  <button ref={el => (btnRefs.current['create'] = el)} 
                  // onClick={(e)=>{
                  //   handleOpenPopUp('create',e);
                  // }} 
                  className='new-blog-btn user-btn'>
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
                  <button className='notify-btn user-btn' onClick={openNotifyBox} ref={el => (btnRefs.current['notify'] = el)}>
                    <FontAwesomeIcon icon={faBell} className='notify-icon user-container-icon'/>
                    {amountNotify>0 &&
                    <div className='notify-alert'>
                        <span className='notify-alert-amount'>{amountNotify<10?amountNotify:`9+`}</span>
                    </div>
                    }
                    <div ref={el => (popupRefs.current['notify'] = el)} className={namePopup=='notify'?'header-pop-up-open':'header-pop-up'}>
                        {userNotify?.length==0 || !userNotify
                        ?(
                          <span className='header-notify-alert'>Không có thông báo nào</span>)
                        :(
                          <ul className='header-pop-up-list notify-list'>
                            {userNotify?.map(n=>(
                              <li key={n?._id} name={n?._id} onClick={e=>seeNotify(e.currentTarget)} className='header-pop-up-item'>
                                <Link to={n?.linkNotify} className='header-pop-up-link header-notify-item'>
                                  <span className='header-notify-item-content'>
                                    <div dangerouslySetInnerHTML={{ __html: n?.contentNotify}}></div>
                                    <div>{formatTime(n?.notifyAt)}</div>
                                  </span>
                                  <span className={n?.isSeen?'header-notify-item-state seen':'header-notify-item-state'}></span>
                                </Link>
                              </li>
                            ))
                            }
                          </ul>
                          )
                        }
                        <Link to={!userNotify?`/login`:`/account/notify`} onClick={()=>{setNamePopup(null);}} className='header-pop-up-link see-all-notify'>{!userNotify?`Đăng nhập để xem thông báo`:`Xem tất cả thông báo`}
                        </Link>
                      </div>
                  </button>
                </div>
                {!currentToken.idCurrentUser 
                ?(
                  <div className='sign-container'>
                    <Link to='/login' id='sign-btn'>
                      Đăng nhập/ Đăng ký
                    </Link>
                  </div>
                )
                :(
                  <div className='user-container-item'>
                  <button ref={el => (btnRefs.current['user'] = el)} 
                  // onClick={(e)=>{
                  //   handleOpenPopUp('user',e);
                  // }} 
                  className='user-bar user-btn'>
                    <div className='user-avatar'>
                      <img src={currentToken.userLogin?.avatar} alt='' className='user-image'/>
                    </div>
                    <p className='user-name'>{currentToken.userLogin?.username}</p>
                      <div ref={el => (popupRefs.current['user'] = el)} className={namePopup=='user'?'header-pop-up-open':'header-pop-up'}>
                      <ul className='header-pop-up-list'>
                        <li className='header-pop-up-item'>
                          <Link to='/account/profile' className='header-pop-up-link user-profile'>
                            Tài khoản của tôi
                          </Link>
                        </li>
                        <li className='header-pop-up-item'>
                          <Link to={`/user/${currentToken.idCurrentUser}`} className='header-pop-up-link blog-manage'>
                            Trang cá nhân
                          </Link>
                        </li>
                        <li className='header-pop-up-item'>
                          <Link to='/account/posts' className='header-pop-up-link blog-manage'>
                            Hoạt động của tôi
                          </Link>
                        </li>
                        <li className='header-pop-up-item'>
                          <a href='/' onClick={handleLogOut} className='header-pop-up-link log-out'>
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                    
                  </button>
                </div>
                )}
                
              </div>
            </div>
          </div>                                    
        </Wrapper>
    )
}

export default Header;

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

  .search-container.mobile{
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 60px;
    margin: 0 -12px;
    border-radius: 0;

    & #search-box{
      width: 100%; 
      border-radius: 0;
      display: flex;
    }
  }

  .search-container{
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

  .search-container #search-box{
    border-radius: 18px;
    border: 2px solid var(--shadow-color);
    width: 400px; 
    height: 100%;
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

  .search-container button{
    position: absolute;
    right: 0;
    border: none;
    height: 36px;
    width: 36px;
    background-color: transparent;
  }

  .search-container .search-btn.disable{
    cursor: default;

    & svg{
      color: var(--shadow-color);
    }

    &:hover svg{
      color: var(--shadow-color);
    }
  }

  .search-container button svg{
    height: 20px;
    transition: var(--transition-time);
    color: var(--text-color);
  }

  .search-container button:hover svg{
    height: 20px;
    color: var(--hightlight-color);
  }

  .search-btn{
    display: block;
  }

  
  .search-header-btn{
    display: none;
  }

  #sign-btn{
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    transition: var(--transition-time);
    display: block;
    width: max-content;
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
    height: 100%;
    align-items: center;
    display: flex;
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
    /* position: relative; */
  }

  .notify-alert{
    position: absolute;
    top: 12px;
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
    background-color: var(--blur-color);
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
    box-sizing: border-box;
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
    padding: 0;
    margin: 0;
    width: max-content;
  }

  .header-pop-up-list.notify-list{
    max-height: 380px;
    overflow-y: scroll;
    scrollbar-color: transparent;

    &::-webkit-scrollbar-thumb {
      background: transparent; 
    }

    & li:not(:last-child){
      border-bottom: 1px solid var(--primary-color);
    }
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

  .header-notify-alert{
    width: 300px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  .header-pop-up-link.header-notify-item{
    padding: 12px;
    width: 300px;
    min-width: 300px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 14px;
  }

  .header-notify-item-content{
    width: 100%;
  }

  .see-all-notify{
    height: 40px;
    box-sizing: border-box;
    display: block;
    border-top: 1px solid var(--shadow-color); 
  }

  .header-notify-item-state{
    min-width: 8px;
    height: 8px;
    background-color: var(--hightlight-color);
    box-sizing: border-box;
    border-radius: 50%;
    display: inline-block;
    margin-left: 12px;
  }

  .header-notify-item-state.seen{
    background-color: transparent;
  }

  .header-pop-up-link:hover{
    color: var(--hightlight-color);
    background-color: var(--primary-color);
  }

  .user-create-notify{
    font-weight: 600;
  }

  /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {
    .header-bar{
      width: 100%;
      padding: 0 12px;
    }
  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    .header-bar{
      width: 100%;
      padding: 0 12px;
    }

    .user-name{
      display: none;
    }

    .search-container{
      border-radius: 0;
      width: 100%; 
      height: 100%;
      margin: 0 18px 0 auto;
    }

    .search-btn{
      display: none;
    }

    .search-header-btn{
      display: block;
    }

    #search-box{
      display: none;
    }

  }

  /* small phone */
  @media (max-width: 480px) {
    .header-bar{
      width: 100%;
      padding: 0 12px;
    }

    .user-name{
      display: none;
    }

    .search-container{
      border-radius: 0;
      width: 100%; 
      height: 100%;
      margin: 0 18px 0 auto;
    }

    .search-btn{
      display: none;
    }

    .search-header-btn{
      display: block;
    }

    #search-box{
      display: none;
    }
  }

`