import { useState, createContext } from 'react';

const AuthContext = createContext();

function AuthProvider({children}){
  const [authToken, setAuthToken]= useState(localStorage.getItem('auth-token'));

  const loginSuccess=(token)=>{
    setAuthToken(token);
  }

  const auth={
    authToken,
    loginSuccess,
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider};
