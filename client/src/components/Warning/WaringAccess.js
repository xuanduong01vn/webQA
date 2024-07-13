import React from 'react';
import styled from 'styled-components';

function WarningAccess(){

  return (
    <Wrapper>
      <div>
        <h1>Bạn không có quyền truy cập trang này!</h1>
        <a href='/'>Quay về trang chủ</a>
      </div>
    </Wrapper>
  )
}

export default WarningAccess;

const Wrapper = styled.div`
  width: 100vw;
  margin-top: -60px;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: var(--shadow-color);

  a{
    text-decoration-line: underline;
    color: var(--hightlight-color);
  }
`