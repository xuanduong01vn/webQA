import React, {useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import NewPost from '../../components/NewPost/NewPost';
import Header from '../../components/Header/Header';
import HeaderDashboard from '../../components/Header/HeaderDashboard';
import Footer from '../../components/Footer/Footer';
import { AuthContext } from '../../AuthContext';

function CreatePost(){
  document.title='Create post';
  const authToken = useContext(AuthContext);

  return (
    <Wrapper>
      {authToken?.userLogin?.idTypeAccount==1 
        ?(<HeaderDashboard/>)
        :(<Header/>)
      }
      <NewPost/>
    </Wrapper>
  )
}

export default CreatePost;


const Wrapper = styled.div`

`