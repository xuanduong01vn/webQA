import './App.css';
import Header from'./components/Header/Header.js';
import Footer from'./components/Footer/Footer.js';
import HomeLayout from './components/HomeLayout/HomeLayout.js';
import React, { createContext} from 'react';
import { BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom';
import { routes } from './routes/index.js';

function App() {

  return (    
    <Router>
      <div className='App'>
        <Routes>
          {
            routes.map((route,index)=>{
              return <Route key={index} exact path={route.path} element={<route.component/>}/>
            })
          }
        </Routes>
      </div>
    </Router>  
    
  );
}

export default App;
