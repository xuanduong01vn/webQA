import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Navigate , useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

function Register(){

  document.title='Register';

  const [samePassword, setSamePassword] = useState(null);
  const [sameAccount, setSameAccount] = useState(false);
  const [sameEmail, setSameEmail] = useState(false);
  const [checked, setChecked] = useState(false);
  const [success, setSuccess]= useState(false);
  const [legitPass, setLegitPass] = useState(true);
  const [hidePassword, setHidePassword] = useState(false);
  const [typeInput, setTypeInput] = useState('password');
  const navigate= useNavigate();

  var [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    password: '',
    ['confirm-password']: '',
  });

  const [inputType, setInputType] = useState({
    password: 'password',
    'confirm-password': 'password',
  });

  function onChangeValue(e){
    const {name, value} = e.target;
      if(sameAccount==true && e.target.name=='username' && e.target.value!= (inputValue.username)){
        setSameAccount(false);
      }
      if(sameEmail==true && e.target.name=='email' && e.target.value!= (inputValue.email)){
        setSameEmail(false);
      }
      if(e.target.name=='password'){
        setLegitPass(e.target.value.trim().length>=6);
      }

      setInputValue({
        ...inputValue,
        [name]: value.trim(),
      });
  }

  function clearInput(){
    setInputValue({
      username: '',
      email: '',
      password: '',
      ['confirm-password']: '',
    })
  };

  var nowTime = new Date();
  var createAt;

  var newInputAccount={
    username: inputValue.username,
    password: inputValue.password,
    email: inputValue.email,
    fullname: '',
    idTypeAccount: 2,
    birthday: '',
    createAt: '',
    avatar: 'http://localhost:9999/file/avatar/avatar-default.jpg',
    listLiked: [],
    listMarked: [],
    newNotify: 0,
    isDeleted: false
  };

  function handleHidePassword(input){
    setInputType(inputType[input]=='password'?
    {
      ...inputType,
      [input]: 'text',
    }
    :{
      ...inputType,
      [input]: 'password',
    })
  }


  function onChecked(){
    setChecked(!checked?true:false);
    console.log(checked);
  }

  function handleRegister(){
    newInputAccount.createAt=new Date();
    newInputAccount.birthday=new Date();
    setSamePassword(inputValue.password != inputValue['confirm-password']);
    if(inputValue.password.length>=6 && inputValue['confirm-password']!='' && inputValue.password == inputValue['confirm-password'] && inputValue.username!='' && inputValue.email!='' && checked){
      axios.post(`http://localhost:9999/accounts/register`,newInputAccount)
      .then(res=>{
        console.log(res.data);
        if(res.data=='Username and password are required'){
          
        }
        else if(res.data=='Tài khoản đã tồn tại'){
          setSameAccount(true);
          setSameEmail(false);
        }
        else if(res.data=='Email đã tồn tại'){
          setSameAccount(false);
          setSameEmail(true);
        }
        else 
        // (res.data!=='Tài khoản đã tồn tại' && res.data!=='Email đã tồn tại') 
        {

          navigate(`/login`);
          clearInput();
          setSameAccount(false);
          setSameEmail(false);
          setChecked(false);
        }
        
      })
      
    }
    
  }

  return(
    <Wrapper>
      <div className='login-container'>
        <h1 className='page-name'>QAx</h1>
        <h3 className='page-title'>Tạo tài khoản QAx</h3>
        <div className='input-item'>
          <input name='username' type='text' placeholder='Tên người dùng' id='username-input' 
          value={inputValue.username}
          onChange = {e=> onChangeValue(e)}/>
          {sameAccount && (<span className='warning-box'>Tên tài khoản này đã được sử dụng</span>)}
          {inputValue.username=='' && (<span className='warning-box'>Không được để trống tên tài khoản</span>)}
        </div>
        <div className='input-item'>
          <input  name='email' type='text' placeholder='Email người dùng' id='email-input' 
          value={inputValue.email}
          onChange = {e=> onChangeValue(e)}/>
          {sameEmail && (<span className='warning-box'>Email này đã được sử dụng</span>)}
          {inputValue.email=='' && (<span className='warning-box'>Không được để trống email</span>)}
        </div>
        <div className='input-item'>
          <input name='password' type={inputType.password} placeholder='Mật khẩu' id='password-input' 
          value={inputValue.password}
          onChange = {e=> onChangeValue(e)}/>
          <button className='hide-password-btn' 
          onClick={()=>handleHidePassword('password')}>
            {inputType.password !='password' ?
              <FontAwesomeIcon icon={faEye} />
              : 
              <FontAwesomeIcon icon={faEyeSlash} />
            }
          </button>
          {!legitPass && (<span className='warning-box'>Mật khẩu phải có ít nhất 6 ký tự</span>)}
        </div>
        <div className='input-item'>
          <input name='confirm-password' type={inputType['confirm-password']} placeholder='Xác nhận mật khẩu' id='confirm-password-input' 
          value={inputValue.confirmPassword}
          onChange = {e=> onChangeValue(e)}/>
          <button className='hide-password-btn' 
          onClick={()=>handleHidePassword('confirm-password')}>
            {inputType['confirm-password'] !='password' ?
              <FontAwesomeIcon icon={faEye} />
              : 
              <FontAwesomeIcon icon={faEyeSlash} />
            }
          </button>
          {samePassword && (<span className='warning-box'>Mật khẩu không khớp</span>)}
        </div>
        <div className='agree-policy'>
          <input className='agree-policy-input' type='checkbox' checked={checked} onChange={onChecked}/>
          <span>Tôi đồng ý với các điều khoản</span>
        </div>
        <a onClick={handleRegister} 
        // href='/login' 
        className='register-btn'>Đăng ký</a>
        
      </div>
    </Wrapper>
  )
}

export default Register;

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

  .agree-policy{
    display: flex; 
    justify-content: left;
  }

  .agree-policy-input{
    height: 14px;
    width: 14px;
    margin-right: 12px;
  }

  .register-btn{
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