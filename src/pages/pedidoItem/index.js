import React from "react";
import { Modal, Tab, Tabs, Table, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import {
  Button,
  ContainerTabStyle,
  ContainerFooterStyle,
  ContainerFooterRightButtonStyle,
  ContainerFooterLeftButtonStyle,
} from "./styles";
import { Alert } from "bootstrap";

function PedidoItem(props) {
  let refSelect = React.createRef();
  let refValorTotal = React.createRef();
  const [refresh, setRefresh] = React.useState(false);
  const [listaProdutos, setListaProdutos] = React.useState([]);

  React.useEffect(() => {
    function load() {
      let body = {};

      axios.post(`http://localhost:3333/produtos/listar`, body).then((res) => {
        setListaProdutos(res.data.message);
      });
    }

    if (props.show) load();
  }, [props.show]);

  const AtualizarPagina = () => {
    setRefresh(!refresh);
  };

  const handleButtonFechar = () => {
    props.onHide();
  };

  const handleButtonSalvar = () => {
    if (!props.pedidoItem.pro_codigo || props.pedidoItem == "S") {
      alert("Selecione um produto!");
      return;
    }

    if (!props.pedidoItem.item_quantidade || props.pedidoItem.item_quantidade == 0) {
      alert("Digite uma quantidade!");
      return;
    }

    let body = {
      pedidoItem: props.pedidoItem,
    };

    if (props.including) {
      axios.post(`http://localhost:3333/pedido_item`, body).then((res) => {
        props.onHide();
      });
    } else {
      axios.put(`http://localhost:3333/pedido_item`, body).then((res) => {
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

  const handleButtonExcluir = () => {
    let body = {
      pedidoItem: props.pedidoItem,
    };

    axios
      .delete(`http://localhost:3333/pedido_item`, {
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
