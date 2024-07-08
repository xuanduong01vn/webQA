import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Navigate ,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';

function Login(){
  document.title='Login';

  const [hidePassword, setHidePassword] = useState(false);
  const [typeInput, setTypeInput] = useState('password');
  const [sameEmail, setSameEmail] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [valueUsername, setValueUsername]=useState('');
  const [valuePassword, setValuePassword]=useState('');
  const [loginFailed, setLoginFailed]=useState(false);
  // const [navigate, setNavigate] = useState(null);
  var [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const auth = useContext(AuthContext);

  const navigate = useNavigate();


  function onChangeValue(e){
    const {name, value} = e.target;
      setInputValue({
        ...inputValue,
        [name]: value.trim(),
      });
      // func(e.target.value.trim());  
  };

  function clearInput(){
    setInputValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  };

  var newInputAccount={
    password: inputValue.password,
    email: inputValue.email,
  };

  function handleHidePassword(e){
    if(hidePassword==true){
      setHidePassword(false);
      setTypeInput('password');
    }
    else{
      setHidePassword(true);
      setTypeInput('text');
    }
  }

  function handleLogin(){
    setSamePassword(inputValue.password != inputValue.confirmPassword);
    if(inputValue.password.length>=6 && inputValue.email.trim().length>0){
      axios.post(`http://localhost:9999/accounts/login/`,newInputAccount)
      .then(res=>{
        console.log(res.data);
        if(res.data=='Username and password are required'){
        }
        else if(res.data.message=='Login success'){
          localStorage.setItem('auth-token', res.data.token);
          auth.loginSuccess(res.data.token);
          navigate(res.data.account==1 ?`/dashboard`:`/` );
        }
        else if(res.data.message=='Login failed'){
          setLoginFailed(true);
        }
        else 
        // (res.data!=='Tài khoản đã tồn tại' && res.data!=='Email đã tồn tại') 
        {
          clearInput();
        }
        
      })
      
    }
    
  }
  return(
    <Wrapper>
      <div className='login-container'>
        <h1 className='page-name'>QAx</h1>
        <h3 className='page-title'>Đăng nhập vào QAx</h3>
        <div className='input-item'>
          <input name='email' id='email-input' type='text' placeholder='Email'
          value={inputValue.email}
          onChange = {e=> onChangeValue(e)}/>
          {inputValue.email=='' && (<span className='warning-box'>Không được để trống email</span>)}
        </div>
        <div className='input-item'>
          <input name='password' id='password-input' type={typeInput} placeholder='Mật khẩu' 
           value={inputValue.password}
           onChange = {e=> onChangeValue(e)}/>
          <button className='hide-password-btn' 
          onClick={handleHidePassword}>
            {hidePassword ?
              <FontAwesomeIcon icon={faEye} />
              : 
              <FontAwesomeIcon icon={faEyeSlash} />
            }
          </button>
          {inputValue.password=='' && (<span className='warning-box'>Không được để trống mật khẩu</span>)}
          {loginFailed && (<span className='warning-box'>Email hoặc mật khẩu sai</span>)}
        </div>
        
        <button onClick={()=>handleLogin()} className='login-btn'>Đăng nhập</button>
        <div className='other-action'>
          <a href='/forgot-password' className='forgot-password-btn'>Quên mật khẩu?</a>
          <a href='/register' className='register-btn'>Tạo tài khoản</a>
        </div>
      </div>
    </Wrapper>
  )
}

export default Login;

const Wrapper =styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-container{
    width: 450px;
    box-shadow: 0 0 10px var(--shadow-color);
    border-radius: 8px;
    padding: 54px 32px;
    box-sizing: border-box;
  }

  .page-name{
    text-align: center;
    margin: 0;
    font-weight: 800;
    font-size: 54px;
    color: var(--shadow-color);
    text-shadow: 
      -1px -1px 0 var(--text-color),  
      1px -1px 0 var(--text-color),
      -1px 1px 0 var(--text-color),
      1px 1px 0 var(--text-color);
  }

  .input-item{
    width: 100%;
    position: relative;
    height: max-content;
    margin-bottom: 24px;
  }

  input{
    width: 100%;
    outline: none;
    height: 36px;
    padding: 0 36px 0 12px;
    box-sizing: border-box;
    border: 1px solid var(--shadow-color);
  }

  .hide-password-btn{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 36px;
    width: 36px;
    outline: none;
    border: none;
    background-color: transparent;
    color: var(--shadow-color);
  }

  .warning-box{
    position: absolute;
    top:100%;
    color: red;
    display: block;
    font-size: 14px;
  }

  .login-btn{
    outline: none;
    border-radius: 4px;
    background-color: var(--hightlight-color);
    width: 100%;
    padding: 12px 0;
    border: none;
    color: white;
    display: block;
    text-align: center;
  }
  
  .login-btn:hover{
    opacity: 0.6;
  }

  .other-action{
    margin: 12px 0;
    display: flex;
    justify-content: space-between;

    a{
      color: var(--hightlight-color);
    }

    a:hover{
      text-decoration: underline;
    }
    
  }

  
`