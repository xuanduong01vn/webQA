import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,
          faPen,
          faBell
} from '@fortawesome/free-solid-svg-icons';
import HeaderAdmin from '../../components/Header/HeaderDashboard';
import DashboarLayout from '../../components/DashboardLayout/DashboardLayout';
import DashboardComment from '../../components/DashboardComment/DashboardComment';


function PageDashboardComment(){
  document.title='Dashboard comment';
  return (
    <Wrapper>
      <div className='dashboard-admin-container'>
        <HeaderAdmin/>
        <div className='dashboard-admin-content'>
          <DashboarLayout title='comment'/>
          <DashboardComment/>
        </div>
      </div>
    </Wrapper>
  )
}

export default PageDashboardComment;

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

`