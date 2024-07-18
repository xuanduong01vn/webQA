import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewAdmin(){

  const [inputUsername, setInputUsername]=useState('');
  const [inputEmail, setInputEmail]=useState('@gmail.com');
  const [inputPassword, setInputPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [samePassword, setSamePassword] = useState(null);
  const [sameAccount, setSameAccount] = useState(false);
  const [adminList, setAdminList] = useState(null);
  const [success, setSuccess]= useState(false);
  const [legitPass, setLegitPass] = useState(true);

  var [inputValue, setInputValue] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(()=>{
    const getDataAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:9999/accounts/');
        return response.data;
      } catch (err) {
        console.log('Error fetching authors:', err.message);
        return [];
      }
    };
    getDataAdmin()
    .then((data) => {
      setAdminList(data || []);
    })
    .catch((err)=>{
      console.log(err.message);
    });
  },[]);

  function onChangeValue(e, func){
    const {name, value} = e.target;
      if(e.target.name == 'username'){
        setInputEmail(e.target.value.trim()+`@gmail.com`);
        setSameAccount(adminList?.some(admin=>admin.username==e.target.value.trim()));
      }
      if(e.target.name=='password'){
        setLegitPass(e.target.value.trim().length>=6);
      }
      setInputValue({
        ...inputValue,
        [name]: value,
      });
      func(e.target.value.trim());  
      
  }

  function clearInput(){
    setInputValue({
      username: '',
      password: '',
      confirmPassword: '',
    })
  };

  var nowTime = new Date();
  var createAt;

  var newInputAccount={
    username: inputUsername,
    password: inputPassword,
    email: inputEmail,
    fullname: '',
    idTypeAccount: 1,
    birthday: '',
    createAt: 'createAt',
    avatar: 'http://localhost:9999/file/avatar/avatar-default.jpg',
    listLiked: [],
    listMarked: [],
    newNotify: 0,
    isDeleted: false
  };


  function addNewAdmin(){
    newInputAccount.createAt=new Date();
    newInputAccount.birthday=new Date();
    setSamePassword(confirmPassword != inputPassword);
    if(inputPassword.length>=6 && confirmPassword !='' && confirmPassword == inputPassword && !sameAccount){
      axios.post(`http://localhost:9999/accounts/register`,newInputAccount)
      .then(res=>{
        console.log(res.data);
        clearInput();
        setInputEmail('@gmail.com');
        setSuccess(true)
        setTimeout(()=>setSuccess(false),2000);
      })
      
    }
    
  }

  return(
    <Wrapper>
      <h2 className='profile-container-title'>Thêm mới quản trị viên</h2>
      <div className='profile-container'>
        <div className='profile-item'>
          <label htmlFor=''>
            <span className='red-asterisk'>* </span>Tên tài khoản
          </label>
          <input name='username' type='text' id='profile-username' className='profile-input'
          value={inputValue.username}
          onChange = {e=> onChangeValue(e, setInputUsername)}/>
          {sameAccount && (<span className='warning-box'>Tên tài khoản này đã được sử dụng</span>)}
        </div>
        <div className='profile-item'>
          <label htmlFor='profile-email'>
          <span className='red-asterisk'>* </span>Email
        </label>
          <input name='email' type='text' id='profile-email' className='profile-input read-only'
          value={inputEmail} readOnly/>
        </div>
        <div className='profile-item'>
          <label htmlFor='profile-birthday'>
          <span className='red-asterisk'>* </span>Mật khẩu
        </label>
          <input name='password' type='text' id='profile-birthday' className='profile-input'
          value={inputValue.password}
          onChange = {e=> onChangeValue(e, setInputPassword)}/>
          {!legitPass && (<span className='warning-box'>Mật khẩu phải có ít nhất 6 ký tự</span>)}
        </div>
        <div className='profile-item'>
          <label htmlFor='profile-birthday'>
          <span className='red-asterisk'>* </span>Xác nhận lại mật khẩu
        </label>
          <input name='confirmPassword' type='text' id='profile-birthday' className='profile-input'
          value={inputValue.confirmPassword}
          onChange = {e=> onChangeValue(e, setConfirmPassword)}/>
          {samePassword && (<span className='warning-box'>Mật khẩu không khớp</span>)}
        </div>
        <div className='profile-item'>
          {success && (<span className='success-alert'>Thêm mới tài khoản thành công</span>)}
        </div>
        
        
        <div className='profile-action'>
          <Link onClick={addNewAdmin} 
          // href='/dashboard/admins'
           className='profile-btn active'>Lưu</Link>
        </div>
        
      </div>
    </Wrapper>
  )
}

export default NewAdmin

const Wrapper = styled.div`
  width: var(--general-width);
  background-color: var(--primary-color);
  padding: 24px;
  box-sizing: border-box;
  border-radius: 8px;

  .profile-container-title{
    margin: 0;
  }  
  
  .profile-container{
    margin-top: 20px;
  }

  .profile-item{
    position: relative;
    margin-bottom: 20px;
    min-height: 22px;
  }

  .red-asterisk{
    color: red;
  }

  .profile-avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  .avatar-btn{
    position: absolute;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    top: 150px;
    left: 150px;
    background-color: var(--primary-color);
    border: 2px solid var(--shadow-color);
    display: flex;
    justify-content: center;
    align-items: center;

    svg{
      height: 60%;
      color: var(--text-color);
    }
  }

  label{
    display: block;
    font-size: 18px;
  }

  .read-only{
    color: var(--text-color);

    &:focus{
      border: 1px solid var(--shadow-color);
    }
  }

  .warning-box{
    position: absolute;
    top:100%;
    color: red;
    display: block;
    font-size: 14px;
  }

  .profile-action{
    display: flex;
    justify-content: right;
  }

  .profile-btn{
    background-color: var(--shadow-color);
    color: white;
    padding: 12px 32px;
    border-radius: 8px;
    margin-left: 20px;
  }

  .profile-btn.active{
    background-color: var(--hightlight-color);
  }

`