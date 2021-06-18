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
  Label, 
  Input,
} from "./styles";
import Produto from "../produto/index";

function App() {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = React.useState(undefined);
  const [listaProdutos, setListaProdutos] = React.useState([]);
  const [ativo, setAtivo] = React.useState(true);
  const [pesquisa, setPesquisa] = React.useState("");

  React.useEffect(() => {
    let body = {
      ativo: ativo ? "S" : "N",
      pesquisa: pesquisa,
    };

    axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/produtos/listar`, body).then((res) => {
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
    axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/produtos`, body).then((res) => {
      body = {
        ativo: ativo ? "S" : "N",
        pesquisa: pesquisa,
      };

      axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/produtos/listar`, body).then((res) => {
        setListaProdutos(res.data.message || []);
      });
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let valor = value;

    setPesquisa(valor);
  };

  const handlePesquisar = (e) => {
    e.preventDefault();

    let body = {
      ativo: ativo ? "S" : "N",
      pesquisa: pesquisa,
    };

    axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/produtos/listar`, body).then((res) => {
      setListaProdutos(res.data.message || []);
    });
  };
  
  return (
    <Container>
      <HeaderStyle>
        <HeaderText>Produtos</HeaderText>
        <Button onClick={openIncludeOrder}>Adicionar Produto</Button>
      </HeaderStyle>
      <Divider />
      <form>
        <Label>
          Pesquisar:
          <Input
            placeholder="Pesquisa por codigo, descrição.."
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
        <Button onClick={handlePesquisar} >
          Pesquisar
        </Button>
      </form>
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
