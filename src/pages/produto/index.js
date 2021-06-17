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
import { Alert } from "bootstrap";

function Produto(props) {
  const [refresh, setRefresh] = React.useState(false);
  const [categorias, setCategorias] = React.useState([]);

  React.useEffect(() => {
    let body = {
      cat_ativa: "S",
    };

    axios.post(`http://localhost:3333/categoria/listar`, body).then((res) => {
      setCategorias(res.data.message || []);
    });

    
  }, []);

  // #region Funções

  const AtualizarPagina = () => {
    setRefresh(!refresh);
  };

  const handleButtonFechar = () => {
    props.onHide();
  };

  const handleButtonSalvar = () => {
    let body = {
      produto: props.produto,
    };

    axios.put(`http://localhost:3333/produtos`, body).then((res) => {
      props.onHide();
    });

    AtualizarPagina();
  };

  const handleButtonExcluir = () => {
    let body = {
      produto: props.produto,
    };

    axios.delete(`http://localhost:3333/produtos`, {
      data: body,
    });

    props.onHide();
  };

  const handleButtonEnviarPromocao = () => {
    let body = {
      usu_ativo: "S",
    };

    axios.post(`http://localhost:3333/usuario/listar`, body).then((res) => {
      
      let emails = '';
        res.data.message.forEach(element => {
          console.log(element.usu_email)
          emails += element.usu_email + ', ';
        });

      body = {
        email: emails,
        mensagem: `${props.produto.pro_descricao} está em promoção por apenas R$ ${props.produto.pro_valor} aproveite!! =)`,
      };
      console.log(body)
      axios.post(`http://localhost:3333/send-email`, body).then((res) => {});
    });

    alert("Promoção enviada com sucesso!");
  };

  const RetornaCategoriaSelecionada = () => {
    let categoriaSelecionada = categorias.find(
      (element) => element.cat_id == props.produto.cat_id
    );

    if (categoriaSelecionada) {
      return categoriaSelecionada.cat_descricao;
    }

    return "";
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let valor = value;

    if (name == "pro_valor" && valor == "") {
      valor = 0;
    } else if (name == "pro_descricao") {
      valor = valor.toUpperCase();
    }

    props.produto[name] = valor;

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
          Produto - {props.produto.pro_codigo}
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
                  name="pro_descricao"
                  onChange={handleOnChange}
                  column
                  size="sm"
                  sm="1"
                  type="input"
                  value={props.produto.pro_descricao}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column size="sm" sm="2">
                Valor:
              </Form.Label>
              <Col>
                {/* <Form.Control name='pro_descricao' onChange={handleOnChange} column size='sm' sm="1" type="input" value={props.produto.pro_descricao} /> */}
                <Form.Control
                  name="pro_valor"
                  type="input"
                  onChange={handleOnChange}
                  column
                  size="sm"
                  value={props.produto.pro_valor}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column size="sm" sm="2">
                Categoria:
              </Form.Label>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" size="sm">
                    {RetornaCategoriaSelecionada()}
                  </Dropdown.Toggle>
                  <Dropdown.Menu size="sm">
                    {categorias.map((item) => (
                      <Dropdown.Item
                        eventKey={item.cat_id}
                        onSelect={(item) => {
                          props.produto.cat_id = item;
                          AtualizarPagina();
                        }}
                      >
                        {item.cat_descricao}
                      </Dropdown.Item>
                    ))}
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
            <Button onClick={handleButtonEnviarPromocao}>
              Enviar Promoção
            </Button>
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
