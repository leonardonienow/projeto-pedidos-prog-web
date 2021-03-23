import React, { Component } from 'react'
import
{
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import './App.css'

import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Pedido from './pages/pedido/index';
import Pedidos from './pages/pedidos/index';
import Produto from './pages/produto/index';
import Produtos from './pages/produtos/index';
import Erro from './pages/erro/index';
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './routes/routes'
import Header from './components/header/index'
import UserProvider from './context/user';
import Container from './components/containerPadrao/index'

class BootstrapNavbar extends React.Component
{

  render()
  {
    return (
      <Router>
        <UserProvider>
          <div className="containerGeral">
            <Header />
            <Container>
              <Routes />
            </Container>
          </div>
        </UserProvider>
      </Router>
    )
  }
}

export default BootstrapNavbar;