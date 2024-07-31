import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faComment,
  faPen,
  faHashtag
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

function GeneralAdmin(){
  const [amountPost, setAmountPost] = useState(0);
  const [amountUser, setAmountUser] = useState(0);
  const [amountTag, setAmountTag] = useState(0);
  const [amountComment, setAmountComment] = useState(0);
  const [postMonth, setPostMonth]= useState([null, null, null, null, null, null, null, null, null, null, null, null]);
  const [userMonth, setUserMonth]= useState([null, null, null, null, null, null, null, null, null, null, null, null]);


  useEffect(()=>{
    const getPosts = async()=>{
      try {
        const response = await axios.get(`http://localhost:9999/posts?isDeleted=false`)
        return response;
      } catch (err) {
        console.log(err.message);
      }
    }
    getPosts()
    .then(res=>{
      setAmountPost(res.data.length);
      const months= res.data.map(p=>new Date(p.createAt).getMonth()); 
      for(let i=0; i<=new Date().getMonth(); ++i){
        let count=0;
        for(let j=0; j<months.length; ++j){
          if(months[j]==i){
            ++count;
          }
        }
        postMonth.splice(i,1,count);
      }
    })
    .catch(err=>{
      console.log(err.message);
    })

    const getUsers = async()=>{
      try {
        const response = await axios.get(`http://localhost:9999/accounts?isDeleted=false&idTypeAccount=2`)
        return response;
      } catch (err) {
        console.log(err.message);
      }
    }
    getUsers()
    .then(res=>{
      setAmountUser(res.data.length);
      const users= res.data.map(u=>new Date(u.createAt).getMonth()); 
      for(let i=0; i<=new Date().getMonth(); ++i){
        let count=0;
        for(let j=0; j<users.length; ++j){
          if(users[j]==i){
            ++count;
          }
        }
        userMonth.splice(i,1,count);
      }
    })
    .catch(err=>{
      console.log(err.message);
    })

    const getTags = async()=>{
      try {
        const response = await axios.get(`http://localhost:9999/tags?isDeleted=false`)
        return response;
      } catch (err) {
        console.log(err.message);
      }
    }
    getTags()
    .then(res=>{
      setAmountTag(res.data.length);
    })
    .catch(err=>{
      console.log(err.message);
    })

    const getComments = async()=>{
      try {
        const response = await axios.get(`http://localhost:9999/comments?isDeleted=false`)
        return response;
      } catch (err) {
        console.log(err.message);
      }
    }
    getComments()
    .then(res=>{
      setAmountComment(res.data.length);
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[])
  
  const labels = []
  for(let i=1;i<13;i++){
    labels.push(`Thg `+i);
  }

  const dataPost = {
    labels: labels,
    datasets: [
      {
        label: 'Số lượng bài viết',
        data: postMonth,
        borderColor: 'rgba(255,111,0,1)',
        fill: false,
        tension: 0,
      },
    ],
  };

  const optionPost = {
    type: 'line',
    responsive: true,
    scales: {
      x: {
        grid: {
          borderDash: [10,10]
        }
      },
      y: {
        title: {
          display: false,
          text: 'Số lượng bài viết'
        },
        grid: {
          borderDash: [5,5]
        },
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 2,
        },
      }
    },
  };

  const dataUser = {
    labels: labels,
    datasets: [
      {
        label: 'Số lượng người dùng',
        data: userMonth,
        borderColor: 'rgba(255,111,0,1)',
        fill: false,
        tension: 0,
      },
    ],
  };

  const optionUser = {
    type: 'line',
    responsive: true,
    scales: {
      x: {
        grid: {
          borderDash: [10,10]
        }
      },
      y: {
        title: {
          display: false,
          text: 'Số lượng người dùng'
        },
        grid: {
          borderDash: [5,5]
        },
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 2,
        },
      }
    },
  };


  return (
    <Wrapper>
      <div className='home-admin-container'>
        <div className='dashboard-title'>
          <h3>Tổng quan</h3>
        </div>
        <div className='dashboard-home-main-content'>
          <div className='dashboard-accounting'>
            <div className='dashboard-accounting-item'>
              <div className='accounting-item-detail'>
                <p className='accounting-item-amount'>{amountUser}</p>
                <p className='accounting-item-title'>người dùng</p>
              </div>
              <span className='accounting-item-icon'>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <Link to='/dashboard/users' className='accounting-item-link'>Xem chi tiết</Link>
            </div>
            <div className='dashboard-accounting-item'>
              <div className='accounting-item-detail'>
                <p className='accounting-item-amount'>{amountPost}</p>
                <p className='accounting-item-title'>bài viết</p>
              </div>
              <span className='accounting-item-icon'>
                <FontAwesomeIcon icon={faPen} />
              </span>
              <Link to='/dashboard/posts' className='accounting-item-link'>Xem chi tiết</Link>
            </div>
            <div className='dashboard-accounting-item'>
              <div className='accounting-item-detail'>
                <p className='accounting-item-amount'>{amountTag}</p>
                <p className='accounting-item-title'>hashtag</p>
              </div>
              <span className='accounting-item-icon'>
                <FontAwesomeIcon icon={faHashtag} />
              </span>
              <Link to='/dashboard/tags' className='accounting-item-link'>Xem chi tiết</Link>
            </div>
            <div className='dashboard-accounting-item'>
              <div className='accounting-item-detail'>
                <p className='accounting-item-amount'>{amountComment}</p>
                <p className='accounting-item-title'>bình luận</p>
              </div>
              <span className='accounting-item-icon'>
                <FontAwesomeIcon icon={faComment} />
              </span>
              <Link to='/dashboard/comments' className='accounting-item-link'>Xem chi tiết</Link>
            </div>
          </div>
          <div className="dashboard-charts">
            <div className="post-permonth-chart dashboard-charts-item">
              <h3>Lượng bài viết hàng tháng</h3>
              <Line data={dataPost} options={optionPost} />
            </div>
            <div className="post-permonth-chart dashboard-charts-item">
              <h3>Lượng người dùng mới hàng tháng</h3>
              <Line data={dataUser} options={optionUser} />
            </div>

          </div>
        </div>

      </div>
    </Wrapper>
  )
}

export default GeneralAdmin;

const Wrapper = styled.div`
  width: 100%;
  padding: 24px;

  h3{
    margin: 0;
  }

  .home-admin-container{
    width: 100%;
  }

  .dashboard-home-main-content{
    width: 100%;
    margin-top: 16px; 
    box-sizing: border-box;
  }

  .dashboard-accounting{
    display: flex;
    min-width: 100%;
    margin: 0 -12px;
    box-sizing: border-box;
    margin-bottom: 24px;
  }

  .dashboard-accounting-item{
    width: 25%;
    margin: 0 12px;
    padding: 0;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    
    &:nth-child(1){
      background-color: red;
    }
    &:nth-child(2){
      background-color: #00c642;
    }
    &:nth-child(3){
      background-color: orange;
    }
    &:nth-child(4){
      background-color: #17a2b8;
    }


  }

  .accounting-item-detail{
    width: 100%;
    margin-bottom: 20px;
    padding: 8px;

    & p{
      margin: 0;
      color: white;
    }

    & p:first-child{
      font-size: 36px;
    }
  }

  .accounting-item-icon{
    opacity: 0.5;
    color: white;
    position: absolute;
    top: 8px;
    right: 8px;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;

    & svg{
      height: 100%;
    }
  }

  .accounting-item-link{
    color: white;
    opacity: 0.5; 
    padding: 8px;
    background-color: var(--text-color);
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    transition: 0.2 ease;

    &:hover{
      opacity: 0.7;
    }
  }

  .dashboard-charts{
    display: flex;
    min-width: 100%;
    margin: 0 -12px;
    box-sizing: border-box;
    display: flex;
  }

  .dashboard-charts-item{
    width: 50%;
    margin: 0 12px;
    padding: 0;
    box-sizing: border-box;
  }

`