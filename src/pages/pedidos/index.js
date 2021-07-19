import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import {
  TableBody,
  TableHeader,
  Linha,
  Coluna,
  HeaderText,
  Divider,
  Container,
  Button,
  HeaderStyle,
  Label,
  Input,
} from "./styles";
import Pedido from "../pedido/index";
import axios from "axios";
import moment from "moment";
import { UserContext } from "../../context/user";

function App() {
  const [including, setIncluding] = React.useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = React.useState(undefined);
  const [listaPedidos, setListaPedidos] = React.useState([]);
  const [ativo, setAtivo] = React.useState(true);
  const [entregue, setEntregue] = React.useState(false);
  const [pesquisa, setPesquisa] = React.useState("");
  const { user } = useContext(UserContext);

  const handlePesquisar = (e) => {
    e.preventDefault();

    let body = {
      pesquisa: pesquisa,
      entregue: entregue ? "S" : "N",
      ativo: ativo ? "S" : "N",
      usu_cpf: user,
    };


    axios.post(`http://localhost:3333/pedidos/listar`, body).then((res) => {
      setListaPedidos(res.data.message || []);
    });
  };

  React.useEffect(() => {
    let body = {
      pesquisa: pesquisa,
      entregue: entregue ? "S" : "N",
      ativo: ativo ? "S" : "N",
      usu_cpf: user,
    };

    axios.post(`http://localhost:3333/pedidos/listar`, body).then((res) => {
      setListaPedidos(res.data.message || []);
    });
  }, [visibleModal]);

  const openIncludeOrder = (e) => {
    e.preventDefault();
    let body = {
      pedido: {
        usu_cpf: user,
        ped_datahora: moment().format("L"),
        ped_entregue: "N",
        ped_ativo: "S",
      },
    };

    axios.post(`http://localhost:3333/pedidos`, body).then((res) => {
      let body = {
        pesquisa: pesquisa,
        entregue: entregue ? "S" : "N",
        ativo: ativo ? "S" : "N",
        usu_cpf: user,
      };

      axios.post(`http://localhost:3333/pedidos/listar`, body).then((res) => {
        setListaPedidos(res.data.message || []);
      });
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let valor = value;

    setPesquisa(valor);
  };

  return (
    <Container>
      <HeaderStyle>
        <HeaderText>Pedidos</HeaderText>
        {user != "admin" ? (
          <Button onClick={openIncludeOrder}>Adicionar Pedido</Button>
        ) : (
          <div />
        )}
      </HeaderStyle>
      <Divider />
      <Pedido
        onHide={() => setVisibleModal(false)}
        pedido={pedidoSelecionado != undefined ? pedidoSelecionado : {}}
        show={visibleModal}
        including={including}
      />
      <form>
        <Label>
          Pesquisar:
          <Input
            placeholder="Pesquisa por código, cpf.."
            name="isGoing"
            type="input"
            onChange={handleOnChange}
          />
        </Label>
        <Label>
          Ativos:
          <Input
            name="isGoing"
            type="checkbox"
            onChange={() => {
              setAtivo(!ativo);
            }}
            checked={ativo}
          />
        </Label>
        <Label>
          Entregue:
          <Input
            name="isGoing"
            type="checkbox"
            onChange={() => {
              setEntregue(!entregue);
            }}
          />
        </Label>
        <Button onClick={handlePesquisar} >
          Pesquisar
        </Button>
      </form>
      <Divider />
      <Table striped bordered hover size="sm">
        <TableHeader>
          <Linha>
            <Coluna>Número</Coluna>
            <Coluna>CPF</Coluna>
            <Coluna>Data</Coluna>
          </Linha>
        </TableHeader>
        <TableBody>
          {listaPedidos.map((item) => (
            <Linha
              key={item.ped_numero}
              onClick={() => {
                setIncluding(false);
                setVisibleModal(true);
                setPedidoSelecionado(
                  listaPedidos.find(
                    (eleme) => eleme.ped_numero == item.ped_numero
                  )
                );
              }}
            >
              <Coluna>{item.ped_numero}</Coluna>
              <Coluna>{item.usu_cpf}</Coluna>
              <Coluna>{item.ped_datahora}</Coluna>
            </Linha>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
