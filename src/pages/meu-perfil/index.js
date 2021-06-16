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
  const [produtoSelecionado, setProdutoSelecionado] = React.useState(undefined);
  const [usuario, setUsuario] = React.useState({ usu_ativo: "S" });
  const [esqueceuASenha, setEsqueceuASenha] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    if (user != null && user != "null" && user != "") {
      let body = {
        cpf: user,
      };

      axios.post(`http://localhost:3333/meu-perfil`, body).then((res) => {
        setUsuario(res.data.message);
        console.log(usuario);
      });
    } else {
      setEsqueceuASenha(true);
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

    //AtualizarPagina();
  };
  const handleButtonFechar = () => {
    ///props.onHide();
  };

  const handleButtonSalvar = () => {
    if (!esqueceuASenha) {
      let body = {
        usuario: usuario,
        cpf_anterior: usuario.usu_cpf,
      };

      axios.put(`http://localhost:3333/usuario`, body).then((res) => {
        history.push("/");
      });
    } else {
      let body = {
        usuario: usuario,
      };

      axios.post(`http://localhost:3333/usuario`, body).then((res) => {
        history.push("/");
      });
    }
  };

  const handleButtonExcluir = () => {
    // let body = {
    //   produto: props.produto,
    // };
    // axios.delete(`http://localhost:3333/produtos`, {
    //   data: body,
    // });
    // props.onHide();
  };

  return (
    <Container>
      <HeaderStyle>
        <HeaderText>Meu Perfil</HeaderText>
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
