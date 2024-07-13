import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,
          faPen,
          faBell
} from '@fortawesome/free-solid-svg-icons';
import HeaderAdmin from '../../components/Header/HeaderDashboard';
import DashboarLayout from '../../components/DashboardLayout/DashboardLayout';
import DashboardAdmin from '../../components/DashboardAdmin/DashboardAdmin';
import WarningAccess from '../../components/Warning/WaringAccess';
import { AuthContext } from '../../AuthContext';

function PageDashboardAdmin(){
  document.title='Dashboard admin';
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
            <DashboarLayout title='admin'/>
            <DashboardAdmin/>
          </div>
        </div>)}
    </Wrapper>
  )
}

export default PageDashboardAdmin;

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