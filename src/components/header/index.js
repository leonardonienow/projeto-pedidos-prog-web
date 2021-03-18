import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Pedido from '../../pages/pedido/index';
import Pedidos from '../../pages/pedidos/index';
import Produto from '../../pages/produto/index';
import Produtos from '../../pages/produtos/index';
import Erro from '../../pages/erro/index';
import { UserContext } from '../../context/user';

export const BootstrapNavbar = () =>
{
    const { authenticated, removeUserAuthenticated } = useContext(UserContext);
    const history = useHistory();

    const handleLoginClick = () =>
    {
        removeUserAuthenticated();
        history.push('/login');
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <Router>
                    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                        <Navbar.Brand>Trabalho sobre Pedidos t</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        {authenticated ? (
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/pedidos">Pedidos</Nav.Link>
                                    <Nav.Link href="/produtos">Produtos</Nav.Link>
                                </Nav>
                                <Form inline>
                                    <Button variant='dark' onClick={handleLoginClick}>Sair</Button>
                                </Form>
                            </Navbar.Collapse>
                        ) : (
                            <div />
                        )}
                    </Navbar>
                </Router>
            </div>
        </div>
    )
}

export default BootstrapNavbar;