import styled from 'styled-components';
import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

function AccountPassword(){

  const authToken = useContext(AuthContext);
  const id=authToken.idCurrentUser;
  const [hidePassword, setHidePassword] = useState(false);
  const [typeInput, setTypeInput] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [inputPassword, setInputPassword]= useState({
    'password-current': '',
    'password-new':'',
    'password-confirm':'',
  });

  const [inputType, setInputType]= useState({
    'password-current': 'password',
    'password-new':'password',
    'password-confirm':'password',
  });

  const [warning, setWarning]= useState(false);
  const [success, setSuccess]= useState(false);


  useEffect(()=>{
    const getPassword= async (req,res)=>{
      try {
        const response = await axios.get(`http://localhost:9999/accounts/${id}`);
        return response.data;
        
      } catch (err) {
        console.log(err.message);
      }
    }

    getPassword()
    .then(data=>{
      setUserPwd(data.password);
    })
    .catch(err=>{
      console.log(err.message);
    })
  },[userPwd, success]);

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

  function onChangValue(e){
    if(e.target.value.trim().length>0){
      setTypeInput('password');
    }
    
    const {name, value}= e.target;
    setInputPassword({
      ...inputPassword,
      [name]: value,
    })
  }

  function cancelInput(){
    setInputPassword({
      'password-current': '',
      'password-new':'',
      'password-confirm':'',
    })
  }

  function handleChangePwd(){
    if(inputPassword['password-current'].trim()!=userPwd)
      {
        setWarning(true);
      }
      else{
        setWarning(false);
      }
    if(inputPassword['password-current']==userPwd && inputPassword['password-new']==inputPassword['password-confirm'])  
      {
        axios.put(`http://localhost:9999/accounts/${id}`,{password: inputPassword['password-new'].trim()})
        setSuccess(true);
        setTimeout(()=>{
          setSuccess(false);
        },3000)
        cancelInput();
      }
  }

  return(
    <Wrapper>
      <h2 className='password-container-title'>Mật khẩu</h2>
      <div className='password-container'>
        <div className='password-item' style={{ display: 'none' }}>
          <div className='password-type-box'>
            <input type="password" id="current-password" name="current-password" autoComplete="new-password" style={{ display: 'none' }} />
          </div>
        </div>
        <div className='password-item'>
          <label htmlFor='password-current'>
            <span className='red-asterisk'>* </span>Mật khẩu hiện tại
          </label>
          <div className='password-type-box'>
          <input type="password" name="fake-password" style={{ display: 'none' }} />
            <input autoComplete='off' type={inputType['password-current']} name='password-current' id='password-current' className='password-input' 
            onChange={(e)=>onChangValue(e)}
            value={inputPassword['password-current']}/>
            <button className='hide-password-btn' 
            onClick={()=>handleHidePassword('password-current')}>
              {inputType['password-current']!='password' ?
                <FontAwesomeIcon icon={faEye} />
                : 
                <FontAwesomeIcon icon={faEyeSlash} />
              }
            </button>
          </div>
          {warning && (<span className='warning-box'>Sai mật khẩu hiện tại</span>)}
        </div>
        <div className='password-item'>
          <label htmlFor='password-new'>
            <span className='red-asterisk'>* </span>Mật khẩu mới
          </label>
          <div className='password-type-box'>
            <input autoComplete='off' type={inputType['password-new']} name='password-new' id='password-new' className='password-input' 
            onChange={(e)=>onChangValue(e)}
            value={inputPassword['password-new']}/>
            <button className='hide-password-btn' 
            onClick={()=>handleHidePassword('password-new')}>
              {inputType['password-new']!='password' ?
                <FontAwesomeIcon icon={faEye} />
                : 
                <FontAwesomeIcon icon={faEyeSlash} />
              }
            </button>
          </div>
          {inputPassword['password-new'].trim().length<6 
          && (<span className='warning-box'>Không được bỏ trống, mật khẩu phải có ít nhất 6 ký tự</span>)}
        </div>
        <div className='password-item'>
          <label htmlFor='password-confirm'>
            <span className='red-asterisk'>* </span>Nhập lại mật khẩu mới
          </label>
          <div className='password-type-box'>
            <input autoComplete='off' type={inputType['password-confirm']} name='password-confirm' id='password-confirm' className='password-input' 
            onChange={(e)=>onChangValue(e)}
            value={inputPassword['password-confirm']}/>
            <button className='hide-password-btn' 
            onClick={()=>handleHidePassword('password-confirm')}>
              {inputType['password-confirm']!='password' ?
                <FontAwesomeIcon icon={faEye} />
                : 
                <FontAwesomeIcon icon={faEyeSlash} />
              }
            </button>
          </div>
          {inputPassword['password-confirm'].length>0 && inputPassword['password-confirm'].trim()!=inputPassword['password-new'].trim()
          && (<span className='warning-box'>Không khớp mật khẩu mới</span>)}
        </div>
        <div className='password-item'>
          {success && (<span className='success-box'>Đổi mật khẩu thành công</span>)}
          
        </div>
        <div className='password-action'>
          <button onClick={cancelInput} className='password-btn'>Hủy</button>
          <button onClick={handleChangePwd} className='password-btn active'>Lưu</button>
        </div>
      </div>
    </Wrapper>
  )
}

export default AccountPassword

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--primary-color);
  padding: 24px;
  box-sizing: border-box;
  border-radius: 8px;
  height: max-content;

  .password-container-title{
    margin: 0;
  }  
  
  .password-container{
    margin-top: 20px;
  }

  .password-item{
    margin-bottom: 20px;
    position: relative;
  }


  .red-asterisk{
    color: red;
  }

  label{
    display: block;
    font-size: 18px;
  }

  .password-type-box{
    position: relative;
    z-index: 1;
  }

  .password-input{

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
    top: 100%;
    font-size: 14px;
    color: red;
  }

  .success-box{
    position: absolute;
    top: 100%;
    color: green;
  }

  .password-action{
    display: flex;
    justify-content: right;
  }

  .password-btn{
    background-color: var(--shadow-color);
    color: white;
    padding: 12px 32px;
    border-radius: 8px;
    margin-left: 20px;
  }

  .password-btn.active{
    background-color: var(--hightlight-color);
  }

`