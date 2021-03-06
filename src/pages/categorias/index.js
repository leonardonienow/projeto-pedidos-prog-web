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
import Categoria from "../categoria/index";

function App() {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [categoriaSelecionado, setCategoriaSelecionado] =
    React.useState(undefined);
  const [listaCategorias, setListaCategorias] = React.useState([]);

  React.useEffect(() => {
    let body = {
      cat_ativa: "S",
    };

    axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/categoria/listar`, body).then((res) => {
      setListaCategorias(res.data.message || []);
    });
  }, [visibleModal]);

  const openIncludeCategoria = () => {
    let body = {
      categoria: {
        cat_descricao: "Descrição temporária",
        cat_ativa: "S",
      },
    };

    axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/categoria`, body).then((res) => {
      body = {
        cat_ativa: "S",
      };

      axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/categoria/listar`, body).then((res) => {
        setListaCategorias(res.data.message || []);
      });
    });
  };

  return (
    <Container>
      <HeaderStyle>
        <HeaderText>Categorias</HeaderText>
        <Button onClick={openIncludeCategoria}>Adicionar Categoria</Button>
      </HeaderStyle>
      <Divider />
      <Categoria
        onHide={() => setVisibleModal(false)}
        categoria={
          categoriaSelecionado != undefined ? categoriaSelecionado : {}
        }
        show={visibleModal}
      />
      <Table striped bordered hover size="sm">
        <TableHeader>
          <Linha>
            <Coluna>Código</Coluna>
            <Coluna>Descrição</Coluna>
          </Linha>
        </TableHeader>
        <TableBody>
          {listaCategorias.map((item) => (
            <Linha
              onClick={() => {
                setVisibleModal(true);
                setCategoriaSelecionado(
                  listaCategorias.find(
                    (eleme) => eleme.cat_codigo == item.cat_codigo
                  )
                );
              }}
            >
              <Coluna>{item.cat_codigo}</Coluna>
              <Coluna>{item.cat_descricao}</Coluna>
            </Linha>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
