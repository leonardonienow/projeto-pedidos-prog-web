import React, { useContext } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import {
  TableBody,
  TableHeader,
  Linha,
  Coluna,
  HeaderText,
  Divider,
  Container,
  HeaderStyle,
  Button,
} from "./styles";
import Produto from "../produto/index";

function App() {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = React.useState(undefined);
  const [listaProdutos, setListaProdutos] = React.useState([]);

  React.useEffect(() => {
    let body = {
      pro_ativo: "S",
    };

    axios.post(`http://localhost:3333/produtos/listar`, body).then((res) => {
      setListaProdutos(res.data.message || []);
    });
  }, [visibleModal]);

  const openIncludeOrder = () => {
    
    let body = {
      produto: {
        pro_descricao: 'Descrição temporária',
        pro_valor: 0,
        cat_codigo: 1,
        pro_ativo: "S",
      },
    };
    axios.post(`http://localhost:3333/produtos`, body).then((res) => {
      body = {
        pro_ativo: "S",
      };

      axios.post(`http://localhost:3333/produtos/listar`, body).then((res) => {
        setListaProdutos(res.data.message || []);
      });
    });
  };

  return (
    <Container>
      <HeaderStyle>
        <HeaderText>Produtos</HeaderText>
        <Button onClick={openIncludeOrder}>Adicionar Produto</Button>
      </HeaderStyle>
      <Divider />
      <Produto
        onHide={() => setVisibleModal(false)}
        produto={produtoSelecionado != undefined ? produtoSelecionado : {}}
        show={visibleModal}
      />
      <Table striped bordered hover size="sm">
        <TableHeader>
          <Linha>
            <Coluna>Código</Coluna>
            <Coluna>Descrição</Coluna>
            <Coluna>Categoria</Coluna>
            <Coluna>Valor</Coluna>
          </Linha>
        </TableHeader>
        <TableBody>
          {listaProdutos.map((item) => (
            <Linha
              onClick={() => {
                setVisibleModal(true);
                setProdutoSelecionado(
                  listaProdutos.find(
                    (eleme) => eleme.pro_codigo == item.pro_codigo
                  )
                );
              }}
            >
              <Coluna>{item.pro_codigo}</Coluna>
              <Coluna>{item.pro_descricao}</Coluna>
              <Coluna>{item.cat_descricao}</Coluna>
              <Coluna>{Number.parseFloat(item.pro_valor).toFixed(2)}</Coluna>
            </Linha>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
