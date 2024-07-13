import styled from 'styled-components';
import React, {useState, useEffect, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera,
} from '@fortawesome/free-solid-svg-icons';

import HeaderAdmin from '../../components/Header/HeaderDashboard';
import AdminLayout from '../../components/DashboardLayout/DashboardLayout';
import GeneralAdmin from '../../components/GeneralAdmin/GeneralAdmin';
import WarningAccess from '../../components/Warning/WaringAccess';
import { AuthContext } from '../../AuthContext';

function HomeAdmin(){
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
              <AdminLayout title='dashboard'/>
              <GeneralAdmin/>
            </div>
          </div>)}
    </Wrapper>
  )
}

export default HomeAdmin;

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