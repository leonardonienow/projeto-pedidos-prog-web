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
  const [atualizarListar, setAtualizarListar] = React.useState(false);
  const { user } = useContext(UserContext);

  React.useEffect(() => {
    let body = {
      entregue: "N",
      ativo: "S",
      usu_cpf: user,
    };

    axios.post(`http://localhost:3333/pedidos/listar`, body).then((res) => {
      setListaPedidos(res.data.message || []);
    });
  }, [visibleModal]);

  const openIncludeOrder = () => {
    let body = {
      pedido: {
        usu_cpf: user,
        ped_datahora: moment().format("L"),
        ped_entregue: "N",
        ped_ativo: "S",
      },
    };

    axios.post(`http://localhost:3333/pedidos`, body).then((res) => {
      body = {
        entregue: "N",
        ativo: "S",
        usu_cpf: user,
      };

      axios.post(`http://localhost:3333/pedidos/listar`, body).then((res) => {
        setListaPedidos(res.data.message || []);
      });
    });
  };

  return (
    <Container>
      <HeaderStyle>
        <HeaderText>Pedidos</HeaderText>
        <Button onClick={openIncludeOrder}>Adicionar Pedido</Button>
      </HeaderStyle>
      <Divider />
      <Pedido
        onHide={() => setVisibleModal(false)}
        pedido={pedidoSelecionado != undefined ? pedidoSelecionado : {}}
        show={visibleModal}
        including={including}
      />
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
