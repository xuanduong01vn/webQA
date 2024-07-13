import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,
          faPen,
          faBell
} from '@fortawesome/free-solid-svg-icons';
import HeaderAdmin from '../../components/Header/HeaderDashboard';
import NewAdmin from '../../components/DashboardAdmin/DashboardNewAdmin';
import WarningAccess from '../../components/Warning/WaringAccess';
import { AuthContext } from '../../AuthContext';

function AddNewAdmin(){
  const user=useContext(AuthContext);
  document.title='Add new admin';
  return (
    <Wrapper>
      {
        user.userLogin.idTypeAccount==2?
        (<WarningAccess/>)
        :(<div className='dashboard-admin-container'>
        <HeaderAdmin/>
          <div className='dashboard-admin-content'>
            <NewAdmin/>
          </div>
        </div>)
      }
    </Wrapper>
  )
}

export default AddNewAdmin;

const Wrapper = styled.div`
width: 100vw;
  margin-top: 60px;

  .dashboard-admin-container{
    width: 100%;
  }

  .dashboard-admin-content{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

`