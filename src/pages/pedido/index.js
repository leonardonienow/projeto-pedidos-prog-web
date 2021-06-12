import React from "react";
import {
  Modal,
  Tab,
  Tabs,
  Table,
  Dropdown,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import DateTimePicker from "react-date-picker";
import axios from "axios";
import {
  Button,
  LinhaDadoStyle,
  ContainerTabStyle,
  ContainerFooterStyle,
  ContainerFooterRightButtonStyle,
  ContainerFooterLeftButtonStyle,
} from "./styles";
import "./styles.css";

const listaProdutos = [
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
  {
    ped_numero: "123",
    pro_codigo: "1",
    pro_valor: "6",
    pro_descricao: "SABÃO EM PÓ",
  },
];

function Pedido(props) {
  let refSelect = React.createRef();
  const [refresh, setRefresh] = React.useState(false);

  const AtualizarPagina = () => {
    setRefresh(!refresh);
  };

  const handleButtonFechar = () => {
    props.onHide();
  };

  const handleButtonSalvar = () => {
    let body = {
      pedido: props.pedido,
    };
    if (props.including) {
      axios.post(`http://localhost:3333/pedidos`, body).then((res) => {
        props.onHide();
      });
    } else {
      axios.put(`http://localhost:3333/pedidos`, body).then((res) => {
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

    props.pedido[name] = valor;
  };

  const handleButtonExcluir = () => {
    let body = {
      pedido: props.pedido,
    };

    axios
      .delete(`http://localhost:3333/pedidos`, {
        data: body,
      })
      .then((res) => {
        props.onHide();
      });
  };

  const handleButtonAdcionarProduto = () => {
    setRefresh(!refresh);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pedido - {props.pedido.ped_numero}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs cd="uncontrolled-tab-example">
          <Tab tabClassName="tabStyle" eventKey="home" title="Dados">
            <ContainerTabStyle>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column size="sm" sm="2">
                    CPF:
                  </Form.Label>
                  <Col>
                    <Form.Control
                      name="usu_cpf"
                      onChange={handleOnChange}
                      disabled={props.including ? false : true}
                      column
                      size="sm"
                      sm="1"
                      type="input"
                      value={props.pedido.usu_cpf}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column size="sm" sm="2">
                    Data:
                  </Form.Label>
                  <Col>
                    <Form.Control
                      name="ped_datahora"
                      disabled={true}
                      column
                      size="sm"
                      sm="1"
                      type="input"
                      value={props.pedido.ped_datahora}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column size="sm" sm="2">
                    Entregue:
                  </Form.Label>
                  <Col>
                    <Form.Control
                      custom
                      as="select"
                      ref={refSelect}
                      onChange={(ref) => {
                        props.pedido.ped_entregue = refSelect.current.value;
                        AtualizarPagina();
                      }}
                      value={props.pedido.ped_entregue}
                    >
                      <option value="S">SIM</option>
                      <option value="N">NÃO</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Form>
            </ContainerTabStyle>
          </Tab>
          <Tab tabClassName="tabStyle" eventKey="profile" title="Produtos">
            <ContainerTabStyle>
              <Button onClick={handleButtonAdcionarProduto}>
                Adicionar Produto
              </Button>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {listaProdutos.map((item) => (
                    <tr>
                      <td>{item.pro_codigo}</td>
                      <td>{item.pro_descricao}</td>
                      <td>{item.pro_valor}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ContainerTabStyle>
          </Tab>
        </Tabs>
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

export default Pedido;
