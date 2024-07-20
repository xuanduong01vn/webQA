import AssetsLayout from '../../components/AccountAssets/AssetsLayout';
import AssetsPost from '../../components/AccountAssets/AssetsPost';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

function AccountNotify(){
  document.title='My notifications';
  const [notifies, setNotifies] = useState(null);
  const [accs, setAccs] = useState(null);

  const authToken = useContext(AuthContext);

  useEffect(()=>{
    const getNotify= async(req,res)=>{
      try {
        const response = await axios.get(`http://localhost:9999/notify/?idAccount=${authToken.idCurrentUser}&sort=notifyAt`)
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    }
    getNotify()
    .then(data=>{
      setNotifies(data);
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[]);

  useEffect(()=>{
    const getAcc= async(req,res)=>{
      try {
        const response = await axios.get(`http://localhost:9999/accounts/?isDeleted=false`)
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    }
    getAcc()
    .then(res=>{
      setAccs(res);
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[]);

  return (
    <Wrapper>
      <Header/>
      <div className='account-container'>
        <div className='account-layout'>
          <AssetsLayout itemActive={'Thông báo'}/>
          {notifies && (
            <AssetsPost posts={notifies} title={'Thông báo'} authors={accs}/>
          )}
        </div>
      </div>

    </Wrapper>
  )
}

export default AccountNotify;

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


  }

  /* tablet large phone*/
  @media (max-width: 768px) and (min-width: 481px) {
    .account-container{
      padding: 0;
    }

    .account-layout{
      width: 100%;
      position: relative;
    }
  }

  /* small phone */
  @media (max-width: 480px) {
    .account-container{
      padding: 0;
    }

    .account-layout{
      width: 100%;
      position: relative;
    }
  }
`