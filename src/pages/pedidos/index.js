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
import moment from 'moment';

function App() {
  const [including, setIncluding] = React.useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = React.useState(undefined);
  const [listaPedidos, setListaPedidos] = React.useState([]);

  React.useEffect(() => {

    let body = {
      "entregue" : "N",
      "ativo" : "S", 
    }

    axios
      .post(`http://localhost:3333/pedidos/listar`, body)
      .then((res) => {
        setListaPedidos(res.data.message);
      });
      
  }, [visibleModal]);

  // 'ped_numero': '126',
  // 'usu_cpf': '561.026.400-63',
  // 'ped_datahora': '2021-20-03 12:54:00',
  // 'ped_entregue': 'N',
  // 'ped_ativo': 'S',
  const openIncludeOrder = () => {
    setIncluding(true);
    setVisibleModal(true);
    setPedidoSelecionado({ped_datahora:  moment().format('L'), ped_entregue: 'N'});
  }

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
