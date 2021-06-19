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

  // #region Funções

  const AtualizarPagina = () => {
    setRefresh(!refresh);
  };

  const handleButtonFechar = () => {
    props.onHide();
  };

  const handleButtonSalvar = (e) => {
    e.preventDefault();
    let body = {
      categoria: props.categoria,
    };

    axios.put(`https://projeto-pedidos-prog-web-api.vercel.app/categoria`, body).then((res) => {
      props.onHide();
    });
  };

  const handleButtonExcluir = (e) => {
    e.preventDefault();
    let body = {
      categoria: props.categoria,
    };

    axios.delete(`https://projeto-pedidos-prog-web-api.vercel.app/categoria`, {
      data: body,
    });

    props.onHide();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let valor = value;

    if (name == "cat_descricao") {
      valor = valor.toUpperCase();
    }

    props.categoria[name] = valor;

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
          Categoria - {props.categoria.cat_codigo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContainerStyle>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column size="sm" sm="2">
                Descrição:
              </Form.Label>
              <Col>
                <Form.Control
                  name="cat_descricao"
                  onChange={handleOnChange}
                  column
                  size="sm"
                  sm="1"
                  type="input"
                  value={props.categoria.cat_descricao}
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
                    {props.categoria.cat_ativa == "S" ? "SIM" : "NÃO"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu size="sm">
                    <Dropdown.Item
                      onSelect={(item) => {
                        props.categoria.cat_ativa = "S";
                        AtualizarPagina();
                      }}
                    >
                      SIM
                    </Dropdown.Item>
                    <Dropdown.Item
                      onSelect={(item) => {
                        props.categoria.cat_ativa = "N";
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
