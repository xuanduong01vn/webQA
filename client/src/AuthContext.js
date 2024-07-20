import { useState, useEffect, createContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({children}){
  const id = Cookies.get('iduser');
  const [idCurrentUser, setIdCurrentUser]= useState(id || '');
  const [userLogin, setUserLogin] = useState({});

  const updateNotifyState=(data)=>{
    setUserLogin({
      ...userLogin,
      newNotify: data,
    })
  }

  useEffect(()=>{
    if(id){
      const getUser = async () => {
        try {
          const response = await axios.get(`http://localhost:9999/accounts/${id}`);
          return response.data;
        } catch (err) {
          console.log(err.message);
          return {};
        }
      };
      getUser()
      .then((data) => {
        setUserLogin(data);
      })
      .catch((err)=>{
        console.log(err.message);
      });
    }
  },[idCurrentUser]);

  const loginSuccess=(user)=>{
    setIdCurrentUser(user._id);
    setUserLogin(user);
  }

  const updateUser=(data)=>{
    setUserLogin({
      ...userLogin,
      avatar: data,
    })
  }
  
  const auth = {
    idCurrentUser,
    loginSuccess,
    updateUser,
    updateNotifyState,
    userLogin,
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider};
