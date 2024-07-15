import AssetsLayout from '../../components/AccountAssets/AssetsLayout';
import AssetsPost from '../../components/AccountAssets/AssetsPost';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

function AccountMarked(){
  document.title='My marked';
  const [markedPosts, setMarkedPosts] = useState(null);
  const [posts, setPosts] = useState(null);
  const [accs, setAccs] = useState(null);
  const userToken = useContext(AuthContext);

  useEffect(()=>{
    const getMarkedPost= async(req,res)=>{
      try {
        const response = await axios.get(`http://localhost:9999/marked/?idAccount=${userToken.idCurrentUser}`)
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    }
    getMarkedPost()
    .then(data=>{
      setMarkedPosts(data[0].markedList);
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[]);

  useEffect(()=>{
    const getPost= async(req,res)=>{
      try {
        const response = await axios.get(`http://localhost:9999/posts`)
        return response.data;
      } catch (err) {
        console.log(err.message);
      }
    }
    getPost()
    .then(data=>{
      setPosts(data);
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
          <AssetsLayout itemActive={'Đã lưu'}/>
          {posts && accs && markedPosts &&(
            <AssetsPost posts={posts?.filter(p=>markedPosts.includes(p._id))} authors={accs}/>
          )}
        </div>
      </div>

    </Wrapper>
  )
}

export default AccountMarked;

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