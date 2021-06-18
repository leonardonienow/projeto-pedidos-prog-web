import React from "react";
import { Modal, Tab, Tabs, Table, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import {
  ButtonPesquisa,
  Button,
  ContainerTabStyle,
  ContainerFooterStyle,
  ContainerFooterRightButtonStyle,
  ContainerFooterLeftButtonStyle,
  Divider,
} from "./styles";
import { Alert } from "bootstrap";

function PedidoItem(props) {
  let refSelect = React.createRef();
  let refValorTotal = React.createRef();
  const [refresh, setRefresh] = React.useState(false);
  const [listaProdutos, setListaProdutos] = React.useState([]);
  const [pesquisa, setPesquisa] = React.useState('');

  function load(body) {
    
    axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/produtos/listar`, body).then((res) => {
      
      setListaProdutos(res.data.message || []);
    });
  }

  const AtualizarPagina = () => {
    setRefresh(!refresh);
  };

  const handleButtonFechar = () => {
    props.onHide();
  };

  const handlePesquisaProduto = (e) => {
    e.preventDefault();
    let body = {
      pesquisa: pesquisa,
    };
    console.log(body)
    load(body);
  };
  
  const handleButtonSalvar = () => {
    if (!props.pedidoItem.pro_codigo || props.pedidoItem == "S") {
      alert("Selecione um produto!");
      return;
    }

    if (
      !props.pedidoItem.item_quantidade ||
      props.pedidoItem.item_quantidade == 0
    ) {
      alert("Digite uma quantidade!");
      return;
    }

    let body = {
      pedidoItem: props.pedidoItem,
    };

    if (props.including) {
      axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/pedido_item`, body).then((res) => {
        props.onHide();
      });
    } else {
      axios.put(`https://projeto-pedidos-prog-web-api.vercel.app/pedido_item`, body).then((res) => {
        props.onHide();
      });
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let valor = value;

    if (name == "pro_valor" && valor == "") {
      valor = 0;
    }

    props.pedidoItem[name] = valor;

    AtualizarPagina();
  };

  const handleOnChangeSearch = (e) => {
    const { value } = e.target;

    setPesquisa(value);
    console.log(pesquisa)
    
  };

  const handleButtonExcluir = () => {
    let body = {
      pedidoItem: props.pedidoItem,
    };

    axios
      .delete(`https://projeto-pedidos-prog-web-api.vercel.app/pedido_item`, {
        data: body,
      })
      .then((res) => {
        props.onHide();
      });
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.including ? "Adicionar Produto" : "Alterar Produto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContainerTabStyle>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column size="sm" sm="3">
                Pesquisa:
              </Form.Label>
              <Col>
                <Form.Control
                  name="item_quantidade"
                  disabled={!props.including}
                  column
                  onChange={handleOnChangeSearch}
                  size="sm"
                  sm="1"
                  type="input"
                  placeholder="Pesquisa por: nome, valor, categoria..."
                />
              </Col>
            <ButtonPesquisa disabled={!props.including} onClick={handlePesquisaProduto}>Pesquisar</ButtonPesquisa>
            </Form.Group>
            <Divider />
            <Form.Group as={Row}>
              <Form.Label column size="sm" sm="3">
                Produto:
              </Form.Label>
              <Col>
                <Form.Control
                  custom
                  disabled={!props.including}
                  as="select"
                  ref={refSelect}
                  onChange={(ref) => {
                    props.pedidoItem.pro_codigo = refSelect.current.value;
                    props.pedidoItem.pro_valor = listaProdutos.find(
                      (x) => x.pro_codigo == refSelect.current.value
                    ).pro_valor;

                    AtualizarPagina();
                  }}
                  value={props.pedidoItem.pro_codigo}
                >
                  <option value={"S"}>SELECIONE</option>
                  {listaProdutos.map((item) => (
                    <option value={item.pro_codigo}>
                      {item.pro_descricao}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column size="sm" sm="3">
                Quantidade:
              </Form.Label>
              <Col>
                <Form.Control
                  name="item_quantidade"
                  onChange={handleOnChange}
                  column
                  size="sm"
                  sm="1"
                  type="input"
                  value={props.pedidoItem.item_quantidade}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column size="sm" sm="3">
                Valor Total:
              </Form.Label>
              <Col>
                <Form.Control
                  name="total_valor"
                  disabled={true}
                  column
                  size="sm"
                  sm="1"
                  type="input"
                  ref={refValorTotal}
                  value={(
                    props.pedidoItem.item_quantidade *
                    props.pedidoItem.pro_valor
                  )
                    .toFixed(2)
                    .toLocaleString("pt-BR")}
                />
              </Col>
            </Form.Group>
          </Form>
        </ContainerTabStyle>
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

export default PedidoItem;
