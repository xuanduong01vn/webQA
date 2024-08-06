import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header.js';
import HeaderDashboard from '../../components/Header/HeaderDashboard.js'
import HomeLayout from '../../components/HomeLayout/HomeLayout.js';
import Footer from '../../components/Footer/Footer.js';
import { AuthContext } from '../../AuthContext.js';


function Home(){
  const authToken = useContext(AuthContext);
  document.title='QAx';

  return(
    <Wrapper>
      {authToken?.userLogin?.idTypeAccount==1 
        ?(<HeaderDashboard/>)
        :(<Header/>)
      }
      <HomeLayout/>
      <Footer/>
    </Wrapper>
  )
}

export default Home;

const Wrapper = styled.div`
`