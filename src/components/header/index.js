import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../context/user";
import "./styles.css";

export const BootstrapNavbar = () => {
  const { authenticated, removeUserAuthenticated, user } =
    useContext(UserContext);
  const history = useHistory();

  const handleLoginClick = (e) => {
    e.preventDefault();
    
    removeUserAuthenticated();
    history.push("/login");
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <Router>
          <Navbar
            className="navbar-header"
            variant="dark"
            expand="lg"
            sticky="top"
          >
            <Navbar.Brand>Trabalho sobre Pedidos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {authenticated && user == "admin" ? (
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/pedidos">Pedidos</Nav.Link>
                  <Nav.Link href="/produtos">Produtos</Nav.Link>
                  <Nav.Link href="/categorias">Categorias</Nav.Link>
                  <Nav.Link href="/usuarios">Usuários</Nav.Link>)
                </Nav>
                <Form inline>
                  <Button
                    variant="dark"
                    className="navbar-button"
                    onClick={handleLoginClick}
                  >
                    Sair
                  </Button>
                </Form>
              </Navbar.Collapse>
            ) : (
              <div />
            )}
            {authenticated && user != "admin" ? (
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/pedidos">Pedidos</Nav.Link>
                  <Nav.Link href="/meu-perfil">Meu perfil</Nav.Link>
                </Nav>
                <Form inline>
                  <Button
                    variant="dark"
                    className="navbar-button"
                    onClick={handleLoginClick}
                  >
                    Sair
                  </Button>
                </Form>
              </Navbar.Collapse>
            ) : (
              <div />
            )}
          </Navbar>
        </Router>
      </div>
    </div>
  );
};

export default BootstrapNavbar;
