import styled from 'styled-components';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera,
} from '@fortawesome/free-solid-svg-icons';

import HeaderDashboard from '../../components/Header/HeaderDashboard.js';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout.js';
import DashboardPost from '../../components/DashboardPost/DashboardPost.js';
import WarningAccess from '../../components/Warning/WaringAccess';
import { AuthContext } from '../../AuthContext';

const itemsPerPage = 10;

function PageDashboardPost(){
  document.title='Dashboard post';
  const user=useContext(AuthContext);

  return (
    <Wrapper>
      {
        user.userLogin.idTypeAccount==2?
        (<WarningAccess/>)
        :(
        <div className='dashboard-admin-container'>
          <HeaderDashboard/>
          <div className='dashboard-admin-content'>
            <DashboardLayout title='post'/>
            <DashboardPost/>
          </div>
        </div>)}
    </Wrapper>
  )
}

export default PageDashboardPost;

const Wrapper = styled.div`
  width: 100vw;
  margin-top: 60px;

  .dashboard-admin-container{
    width: 100%;
  }

  .dashboard-admin-content{
    width: 100%;
    display: flex;
  }

  .data-post{
    width: 100%;
    padding: 24px;
  }

  .dashboard-add-new{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  h3{
    margin: 0;
  }
  .dashboard-new-btn{
    background-color: var(--hightlight-color); 
    padding: 8px;
    border-radius: 8px;
    color: white;
    transition: var(--transition-time);
  }

  .dashboard-new-btn:hover{
    background-color: var(--shadow-color); 
    color: black;
  }

  .dashboard-filter-list{
    display: flex;
    justify-content: left;
    background-color: var(--primary-color);
  }

  .post-state-filter{
    outline: none;
    padding: 4px 12px;
  }

  .dashboard-filter-item{
    border-bottom: 4px solid transparent;
    transition: var(--hightlight-color);
    font-size: 18px;
    cursor: pointer;
    padding: 4px 12px;
  }

  .dashboard-filter-item:hover{
    .filter-item-link{
      color: var(--hightlight-color)
    }
  }

  .dashboard-filter-item.active{
    border-bottom: 4px solid var(--hightlight-color);
    color: var(--hightlight-color);

    .filter-item-link{
      color: var(--hightlight-color)
    }
  }

  .data-table{
    min-height: 540px;
  }

  table, th, td{
    border: 1px solid var(--shadow-color);
    border-collapse: collapse;
    padding: 4px 12px;
    height: 40px;
  }
  table{
    width: 100%;
  }

  th{
    background-color: var(--primary-color);
  }

  tr:nth-child(even){
    background-color: var(--primary-color);
  }

  tr td:first-child{
    text-align: center;
  }

  thead th:nth-child(1){
    width: 60px;
    box-sizing: border-box;
  }

  thead th:nth-child(2){
    min-width: 50%;
  }

  thead th:nth-child(3){
    width: 10%;
  }

  thead th:last-child{
    width: 84px;
    box-sizing: border-box;
  }

  .detail-item-btn{
    background-color: var(--hightlight-color); 
    padding: 8px;
    border-radius: 8px;
    color: white;
    transition: var(--transition-time);
    display: block;
    width: max-content;
  }

  .detail-item-btn:hover{
    background-color: var(--shadow-color); 
  }

  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  .page-item {
    margin: 0 5px;
    border: 1px solid var(--shadow-color);
    border-radius: 4px;

    &:not(.disabled):hover{
      border: 1px solid var(--hightlight-color);
      opacity: 0.6;
    }

    &:not(.disabled):hover .page-link{
      color: var(--hightlight-color);
    }
  }
 
  .page-link{
    padding: 4px 12px;
    display: block;
  }

  .page-item.active {
    background-color: var(--hightlight-color);
    border: 1px solid var(--hightlight-color);

    &:hover .page-link{
      color: white;
    }

    & .page-link{
      color: white;
    }
  }

  .page-item.disabled {
    cursor: default;
    color: var(--shadow-color);

    & .page-link{
      cursor: default;
      color: var(--shadow-color);
    }
  }

`