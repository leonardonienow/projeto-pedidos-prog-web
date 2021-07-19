import React, { View } from "react";
import axios from "axios";
import { Modal, Dropdown, Form, Col, Row } from "react-bootstrap";
import {
  ContainerStyle,
  Button,
  ContainerFooterStyle,
  ContainerFooterRightButtonStyle,
  ContainerFooterLeftButtonStyle,
} from "./styles";
import "./styles.css";

function Produto(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [cpfAnterior, setCpfAnterior] = React.useState("");
  //let cpfAnterior = '';
  // #region Funções

  React.useEffect(() => {
    let body = {
      cpf: props.usuario.usu_cpf,
    };

    axios.post(`http://localhost:3333/meu-perfil`, body).then((res) => {
      console.log(res.data);
      setCpfAnterior(
        res.data.message != undefined && res.data.message.length > 0
          ? res.data.message[0].usu_cpf
          : ""
      );
    });
  }, [props.show]);

  const AtualizarPagina = () => {
    setRefresh(!refresh);
  };

  const handleButtonFechar = () => {
    props.onHide();
  };

  const handleButtonSalvar = (e) => {
    e.preventDefault();
    let body = {
      usuario: props.usuario,
      cpf_anterior: cpfAnterior,
    };
    

    axios.put(`http://localhost:3333/usuario`, body).then((res) => {
      let body = {
        cpf: props.usuario.usu_cpf,
      };

      axios.post(`http://localhost:3333/meu-perfil`, body).then((res) => {
        console.log(res.data);
        setCpfAnterior(
          res.data.message != undefined && res.data.message.length > 0
            ? res.data.message[0].usu_cpf
            : ""
        );
      });

      props.onHide();
    });
  };

  const handleButtonExcluir = (e) => {
    e.preventDefault();
    let body = {
      usuario: props.usuario,
    };

    axios
      .delete(`http://localhost:3333/usuario`, {
        data: body,
      })
      .then((res) => {
        let body = {
          cpf: props.usuario.usu_cpf,
        };

        axios.post(`http://localhost:3333/meu-perfil`, body).then((res) => {
          console.log(res.data);
          setCpfAnterior(
            res.data.message != undefined && res.data.message.length > 0
              ? res.data.message[0].usu_cpf
              : ""
          );
        });
      });

    props.onHide();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let valor = value;

    props.usuario[name] = valor;

    AtualizarPagina();
  };

  // #endregion

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Usuario - {props.usuario.cat_codigo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContainerStyle>
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
                  value={props.usuario.usu_cpf}
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
                  value={props.usuario.usu_email}
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
                  value={props.usuario.usu_senha}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column size="sm" sm="2">
                Ativo:
              </Form.Label>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" size="sm">
                    {props.usuario.usu_ativo == "S" ? "SIM" : "NÃO"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu size="sm">
                    <Dropdown.Item
                      onSelect={(item) => {
                        props.usuario.usu_ativo = "S";
                        AtualizarPagina();
                      }}
                    >
                      SIM
                    </Dropdown.Item>
                    <Dropdown.Item
                      onSelect={(item) => {
                        props.usuario.usu_ativo = "N";
                        AtualizarPagina();
                      }}
                    >
                      NÃO
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Form.Group>
          </Form>
        </ContainerStyle>
      </Modal.Body>
      <Modal.Footer>
        <ContainerFooterStyle>
          <ContainerFooterLeftButtonStyle>
            <Button onClick={handleButtonExcluir}>Excluir</Button>
          </ContainerFooterLeftButtonStyle>
          <ContainerFooterRightButtonStyle>
            <Button onClick={handleButtonSalvar}>Salvar</Button>
            <Button onClick={handleButtonFechar}>Fechar</Button>
          </ContainerFooterRightButtonStyle>
        </ContainerFooterStyle>
      </Modal.Footer>
    </Modal>
  );
}

export default Produto;
