import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, HeaderText, MensagemDeErro, ContainerBotoes } from "./styles";
import Container from "../../components/container/index";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Text } from "../../components/padroes/index";
import { UserContext } from "../../context/user";
import { CommonLoading } from "react-loadingg";
import axios from "axios";

function App() {
  const { setUserAuthenticated, authenticated } = useContext(UserContext);
  const history = useHistory();

  const [state, setState] = React.useState({
    user: "",
    password: "",
    passwordError: false,
    passwordMessage: "",
    //loading: false,
  });

  React.useEffect(() => {
    if (authenticated) history.replace("/");
  }, [authenticated, history]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let param = [state.user.trim(), state.password.trim()];

    let body = {
      usuario: param[0],
      senha: param[1],
    };

    axios
      .post(`http://localhost:3333/login`, body)
      .then((res) => {
        
        if (res.data.status == "200") {
          setUserAuthenticated(res.data.message);
          history.push("/login");
        } else {
          setState({
            ...state,
            ["passwordMessage"]: "Usuário e/ou senha incorreta!",
            ["passwordError"]: true,
          });
        }
      })
      .catch(
        setState({
          ...state,
          ["passwordMessage"]: "Problemas ao efetuar Login!",
          ["passwordError"]: true,
        })
      );
  };

  const forgotPassword = (e) => {
    e.preventDefault();

    history.push("/meu-perfil");
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <HeaderText>Login</HeaderText>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Usuário</Form.Label>
          <Form.Control name="user" type="user" onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={handleOnChange}
          />
          {state.passwordError ? (
            <MensagemDeErro>{state.passwordMessage}</MensagemDeErro>
          ) : (
            <div />
          )}
        </Form.Group>
        <ContainerBotoes>
          <Button variant="primary" type="submit">
            Logar
          </Button>
          <Button variant="primary" onClick={forgotPassword}>
            Registrar-se
          </Button>
          <Button variant="primary" onClick={forgotPassword}>
            Esqueci minha senha
          </Button>
        </ContainerBotoes>
      </Form>
    </Container>
  );
}

export default App;
