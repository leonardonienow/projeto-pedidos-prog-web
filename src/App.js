import React from 'react'
import { BrowserRouter as Router, } from "react-router-dom";
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './routes/routes'
import Header from './components/header/index'
import UserProvider from './context/user';

class BootstrapNavbar extends React.Component
{

  render()
  {
    return (
      <Router>
        <UserProvider>
          <div className="containerGeral">
            <Header />
            <Routes />
          </div>
        </UserProvider>
      </Router>
    )
  }
}

export default BootstrapNavbar;