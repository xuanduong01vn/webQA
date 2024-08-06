import ProfileSection from '../../components/Account/AccountProfile.js';
import Header from '../../components/Header/Header.js';
import HeaderDashboard from '../../components/Header/HeaderDashboard';
import Footer from '../../components/Footer/Footer.js';
import AccountNavbar from '../../components/Account/AccountNavbar.js';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';

function Profile(){
  document.title='Account profile';
  const title='Thông tin cá nhân';
  const authToken = useContext(AuthContext);
  
  return (
    <Wrapper>
      {authToken?.userLogin?.idTypeAccount==1 
        ?(<HeaderDashboard/>)
        :(<Header/>)
      }
      <div className='account-container'>
        <div className='account-layout'>
          <AccountNavbar title={title}/>
          <ProfileSection/>
        </div>
      </div>

    </Wrapper>
  )
}

export default Profile;

const Wrapper = styled.div`

  .account-container{
    display: flex;
    width: 100%;
    margin: 80px 0 20px 0;
    min-height: 560px;
    justify-content: center;
    box-sizing: border-box;
  }

  .account-layout{
    width: var(--general-width);
    display: flex;
  }

  /* small desktop*/
  @media (max-width: 1279px) and (min-width: 769px) {
    .account-layout{
      width: 100%;
      padding: 0 12px;
    }

  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    .account-container{
      margin-top: 60px;
    }

    .account-layout{
      width: 100%;
      padding: 0 12px;
      display: block;
    }
  }

  /* small phone */
  @media (max-width: 480px) {

    .account-container{
      margin-top: 60px;
    }
    .account-layout{
      width: 100%;
      padding: 0 12px;
      display: block;
    }
  }
`