import React, {useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import EditPost from '../../components/EditPost/EditPost';
import Header from '../../components/Header/Header';
import HeaderDashboard from '../../components/Header/HeaderDashboard';
import { AuthContext } from '../../AuthContext';

function UpdatePost(){
  const authToken = useContext(AuthContext);
  const [titlepage, setTitlepage] =useState('');
  
  function handleTitle(title){
    setTitlepage(title);
  }

  document.title=`Edit ${titlepage}`;

  return (
    <Wrapper>
      {authToken?.userLogin?.idTypeAccount==1 
        ?(<HeaderDashboard/>)
        :(<Header/>)
      }
      <EditPost onReceivedTitle={handleTitle}/>
    </Wrapper>
  )
}

export default UpdatePost;


const Wrapper = styled.div`

`