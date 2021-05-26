import React from 'react'
import
{
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from '../pages/login/index';
import Pedidos from '../pages/pedidos/index';
import Produtos from '../pages/produtos/index';
import Categorias from '../pages/categorias/index';
import PrivateRoute from './authenticated.route';
import "bootstrap/dist/css/bootstrap.min.css";

class BootstrapNavbar extends React.Component
{
    render()
    {
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Pedidos} />
                <PrivateRoute exact path="/pedidos" component={Pedidos} />
                <PrivateRoute exact path="/produtos" component={Produtos} />
                <PrivateRoute exact path="/categorias" component={Categorias} />
            </Switch>
        )
    }
}

export default BootstrapNavbar;