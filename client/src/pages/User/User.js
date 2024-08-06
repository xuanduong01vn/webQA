import React, {useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import HeaderDashboard from '../../components/Header/HeaderDashboard';
import UserLayout from '../../components/User/User';
import Footer from '../../components/Footer/Footer';
import { AuthContext } from '../../AuthContext';

function User(){
  const authToken = useContext(AuthContext);
  const [userFullname, setUserFullname] = useState('');
  
  function handleUserName(fullname){
    setUserFullname(fullname);
  }

  document.title=userFullname;

  return(
    <Wrapper>
      {authToken?.userLogin?.idTypeAccount==1 
        ?(<HeaderDashboard/>)
        :(<Header/>)
      }
      <div className='content-section'>
        <UserLayout onDataReceived={handleUserName}/>
      </div>
      <Footer/>
    </Wrapper>
  )
}

export default User;

const Wrapper = styled.div`
  .content-section{
    width: 100%;
    margin-top: 80px;
  }
`