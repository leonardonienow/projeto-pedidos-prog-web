import React from "react";
import { UserContext } from "../../context/user";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from "../gerador-pdf/index";
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
import PedidoItem from "../pedidoItem/index";
import axios from "axios";
import {
  Button,
  LinhaDadoStyle,
  ContainerTabStyle,
  ContainerFooterStyle,
  ContainerFooterRightButtonStyle,
  ContainerFooterLeftButtonStyle,
  TableHeader,
  Linha,
  Coluna,
  TableBody,
} from "./styles";
import "./styles.css";

function Pedido(props) {
  let refSelect = React.createRef();
  const [refresh, setRefresh] = React.useState(false);
  const [listaProdutos, setListaProdutos] = React.useState([]);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [including, setIncluding] = React.useState(false);
  const [pedidoItemSelecionado, setPedidoItemSelecionado] =
    React.useState(undefined);
  const { user } = React.useContext(UserContext);
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  React.useEffect(() => {
    function load() {
      let body = {
        pedidoItem: props.pedido,
      };
      if (user != "admin") {
        axios
          .post(`http://localhost:3333/pedido_item/listar`, body)
          .then((res) => {
            setListaProdutos(res.data.message);
          });

        props.pedido.usu_cpf = user;
      }
    }

    if (props.show) load();
  }, [visibleModal, props.show]);

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
      todosItens: true,
    };

    axios
      .delete(`http://localhost:3333/pedido_item`, {
        data: body,
      })
      .then((res) => {
        body = {
          pedido: props.pedido,
        };

        axios
          .delete(`http://localhost:3333/pedidos`, {
            data: body,
          })
          .then((res) => {
            props.onHide();
          });
      });
  };

  const handleButtonGerarPDF = async () => {
    const classeImpressao = new Impressao(listaProdutos);
    const documento = await classeImpressao.PreparaDocumento();
    pdfMake.createPdf(documento).open({}, window.open("", "_blank"));
  };

  const handleButtonAdcionarProduto = () => {
    setPedidoItemSelecionado({
      ped_numero: props.pedido.ped_numero,
      pro_valor: 0,
      item_quantidade: 0,
    });
    setIncluding(true);
    setVisibleModal(true);
    setRefresh(!refresh);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <PedidoItem
        onHide={() => setVisibleModal(false)}
        pedidoItem={
          pedidoItemSelecionado != undefined ? pedidoItemSelecionado : {}
        }
        show={visibleModal}
        including={including}
      />
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
                      disabled={true}
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
          {!props.including ? (
            <Tab tabClassName="tabStyle" eventKey="profile" title="Produtos">
              <ContainerTabStyle>
                <Button onClick={handleButtonAdcionarProduto}>
                  Adicionar Produto
                </Button>
                <Table striped bordered hover size="sm">
                  <TableHeader>
                    <Linha>
                      <Coluna>Código</Coluna>
                      <Coluna>Descrição</Coluna>
                      <Coluna>Quantidade</Coluna>
                      <Coluna>Valor</Coluna>
                    </Linha>
                  </TableHeader>
                  <TableBody>
                    {listaProdutos.map((item) => (
                      <Linha
                        key={item.ped_numero}
                        onClick={() => {
                          setIncluding(false);
                          setVisibleModal(true);
                          setPedidoItemSelecionado(
                            listaProdutos.find(
                              (eleme) => eleme.pro_codigo == item.pro_codigo //&& eleme.pro_codigo == item.pro_codigo
                            )
                          );
                        }}
                      >
                        <Coluna>{item.pro_codigo}</Coluna>
                        <Coluna>{item.pro_descricao}</Coluna>
                        <Coluna>{item.item_quantidade}</Coluna>
                        <Coluna>
                          {(item.item_quantidade * item.pro_valor)
                            .toFixed(2)
                            .toLocaleString("pt-BR")}
                        </Coluna>
                      </Linha>
                    ))}
                  </TableBody>
                </Table>
              </ContainerTabStyle>
            </Tab>
          ) : (
            <div />
          )}
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <ContainerFooterStyle>
          <ContainerFooterLeftButtonStyle>
            <Button onClick={handleButtonExcluir}>Excluir</Button>
            <Button onClick={handleButtonGerarPDF}>Gerar PDF</Button>
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
