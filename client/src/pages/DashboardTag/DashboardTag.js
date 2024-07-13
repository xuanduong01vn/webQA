import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import HeaderAdmin from '../../components/Header/HeaderDashboard';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import DashboardTag from '../../components/DashboardTag/DashboardTag';
import WarningAccess from '../../components/Warning/WaringAccess';
import { AuthContext } from '../../AuthContext';

function PageDashboardTag(){
  document.title='Dashboard tag';
  const user=useContext(AuthContext);
  return (
    <Wrapper>
      {
        user.userLogin.idTypeAccount==2?
        (<WarningAccess/>)
        :(
        <div className='dashboard-admin-container'>
          <HeaderAdmin/>
          <div className='dashboard-admin-content'>
            <DashboardLayout title='tag'/>
            <DashboardTag/>
          </div>
        </div>)}
    </Wrapper>
  )
}

export default PageDashboardTag;

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