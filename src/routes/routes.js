import React from 'react'
import
{
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../pages/login/index';
import Pedido from '../pages/pedido/index';
import Pedidos from '../pages/pedidos/index';
import Produto from '../pages/produto/index';
import Produtos from '../pages/produtos/index';
import Erro from '../pages/erro/index';
import PrivateRoute from './authenticated.route';
import "bootstrap/dist/css/bootstrap.min.css";

class BootstrapNavbar extends React.Component
{
    render()
    {
        return (
            <Switch>
                <Route path="/login"> <Login /> </Route>
                <Route path="/"> <Login /> </Route>
                <PrivateRoute path="/pedidos"> <Pedidos /> </PrivateRoute>
                <PrivateRoute path="/produtos"> <Produtos /> </PrivateRoute>
            </Switch>
        )
    }
}

export default BootstrapNavbar;