import AssetsLayout from "../../components/AccountAssets/AssetsLayout";
import AssetsDeleted from "../../components/AccountAssets/AssetsDeleted";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

function AccountDeleted(){
  document.title="My deleted";
  return (
    <Wrapper>
      <Header/>
      <div className="account-container">
        <div className="account-layout">
          <AssetsLayout itemActive={"Thùng rác"}/>
          <AssetsDeleted/>
        </div>
      </div>
      <Footer/>
    </Wrapper>
  )
}

export default AccountDeleted;

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