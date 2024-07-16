import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown,
 } from '@fortawesome/free-solid-svg-icons';

function AssetsLayout(props){

  const {itemActive}=props;
  const [openNavbar, setOpenNavbar]= useState('account-navbar');

  const handleOpenNavbar =()=>{
    openNavbar=='account-navbar'?setOpenNavbar('account-navbar-opened'):setOpenNavbar('account-navbar');
  }

  const onResizeWidthBrowser=()=>{
    if(openNavbar=='account-navbar-opened'){
      setOpenNavbar('account-navbar');
    }
  }

  window.addEventListener('resize', onResizeWidthBrowser)

  const navbarItems=[
    {path:'/account/post', title: 'Bài viết'},
    {path:'/account/deleted', title: 'Thùng rác'},
    {path:'/account/liked', title: 'Đã thích'},
    {path:'/account/marked', title: 'Đã lưu'},
  ]

  const [selectedItem, setSelectedItem]=useState(0);

  return(
    <Wrapper>
      <div className={openNavbar}>
        <ul className='account-navbar-list'>
          {
            navbarItems.map((item, index)=>{
              return  (<li key={index} className={itemActive==item.title?'account-navbar-item active':'account-navbar-item'}>
                  <Link to={item.path} 
                  className='account-navbar-link'>
                    <span>{item.title}</span>
                  </Link>
                </li>)
            }
            )
 
          }
        </ul>
        <div onClick={handleOpenNavbar} className='down-menu-btn'>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </Wrapper>
  )
}

export default AssetsLayout

const Wrapper = styled.div`
  min-width: 220px;
  padding: 0 20px 24px 0;
  box-sizing: border-box;

  .account-navbar{
    width: 100%;
    box-sizing: border-box;
  }

  .account-navbar-title{
    padding: 0;
    margin: 0;
    text-align: left;
  }

  .account-navbar-list{
    list-style: none;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .account-navbar-item{
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 8px;
    border-radius: 8px;
    transition: var(--transition-time);
  }

  .account-navbar-item.active{
    background-color: var(--primary-color);
   
    .account-navbar-link{
      color:var(--hightlight-color);
    }
  }

  .account-navbar-item:not(.active):hover{
    background-color: var(--primary-color);
  }

  .account-navbar-link{
    width: 100%;
    height: max-content;
    padding: 12px;
    display: block;
    font-weight: 800;
    box-sizing: border-box;
  }

  .down-menu-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 32px;
    width: 100%;
    box-sizing: border-box;
    display: none;

    & svg{
      height: 24px;
    }
  }

  /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {


  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    width: 160px;


  }

  /* small phone */
  @media (max-width: 480px) {
    width: 100%;
    position: absolute;
    background-color: white; 
    box-shadow: 0 0 10px var(--shadow-color);
    /* top: -208px; */
    /* top: -20px; */
    top: -238px;
    padding: 0;

    .account-navbar{
      position: absolute;
      top: 32px;
      background-color: white; 
      box-shadow: 0 0 10px var(--shadow-color);
    }

    .account-navbar-opened{
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      top: 202px;
      background-color: white; 
      box-shadow: 0 0 10px var(--shadow-color);


      & svg{
        transform: rotateX(180deg);
      }
    }

    .down-menu-btn{
      display: flex;
    }
  }

`
