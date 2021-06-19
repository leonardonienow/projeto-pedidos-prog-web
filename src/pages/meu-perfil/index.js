import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Table, Col, Form, Row } from "react-bootstrap";
import {
  TableBody,
  ContainerFooterLeftButtonStyle,
  ContainerFooterRightButtonStyle,
  ContainerFooterStyle,
  HeaderText,
  Divider,
  Container,
  HeaderStyle,
  Button,
} from "./styles";
import { UserContext } from "../../context/user";

function App() {
  const [usuario, setUsuario] = React.useState({ usu_ativo: "S" });
  const [registrando, setregistrando] = React.useState(false);
  const { user, autheticated } = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    if (user != null && user != "null" && user != "") {
      let body = {
        cpf: user,
      };
      
      axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/meu-perfil`, body).then((res) => {
        setUsuario(res.data.message);
        
      });
    } else {
      setregistrando(true);
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let valor = value;

    if (name == "usu_cpf") {
      setUsuario((prevState) => ({ ...prevState, usu_cpf: valor }));
    } else if (name == "usu_email") {
      setUsuario((prevState) => ({ ...prevState, usu_email: valor }));
    } else if (name == "usu_senha") {
      setUsuario((prevState) => ({ ...prevState, usu_senha: valor }));
    }
  };

  const handleButtonSalvar = (e) => {
    e.preventDefault();
    if (!registrando) {
      let body = {
        usuario: usuario,
        cpf_anterior: usuario.usu_cpf,
      };

      axios.put(`https://projeto-pedidos-prog-web-api.vercel.app/usuario`, body).then((res) => {
        history.push("/");
      });
    } else {
      let body = {
        usuario: usuario,
      };

      axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/usuario`, body).then((res) => {
        if (res == undefined) {
          body = {
            usuario: usuario,
            cpf_anterior: usuario.usu_cpf,
          };
        }
        axios.put(`https://projeto-pedidos-prog-web-api.vercel.app/usuario`, body).then((res) => {
          history.push("/");
        });
        history.push("/");
      });
    }
  };

  return (
    <Container>
      <HeaderStyle>
        <HeaderText>{!registrando ? "Meu Perfil" : "Registro"}</HeaderText>
      </HeaderStyle>
      <Divider />
      <Form>
        <Form.Group as={Row}>
          <Form.Label column size="sm" sm="2">
            CPF:
          </Form.Label>
          <Col>
            <Form.Control
              name="usu_cpf"
              onChange={handleOnChange}
              column
              size="sm"
              sm="1"
              type="input"
              value={usuario.usu_cpf}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column size="sm" sm="2">
            Email:
          </Form.Label>
          <Col>
            <Form.Control
              name="usu_email"
              onChange={handleOnChange}
              type='email'
              column
              size="sm"
              sm="1"
              type="input"
              value={usuario.usu_email}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column size="sm" sm="2">
            Senha:
          </Form.Label>
          <Col>
            <Form.Control
              name="usu_senha"
              onChange={handleOnChange}
              column
              size="sm"
              sm="1"
              type="input"
              value={usuario.usu_senha}
            />
          </Col>
        </Form.Group>
      </Form>
      <ContainerFooterStyle>
        <ContainerFooterRightButtonStyle>
          <Button onClick={handleButtonSalvar}>Salvar</Button>
        </ContainerFooterRightButtonStyle>
      </ContainerFooterStyle>
    </Container>
  );
}

export default App;
