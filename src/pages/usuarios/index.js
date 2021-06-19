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
  Input
} from "./styles";
import Usuario from "../usuario/index";

function App() {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] =
    React.useState(undefined);
  const [listaUsuarios, setlistaUsuarios] = React.useState([]);
  const [ativo, setAtivo] = React.useState(true);
  const [pesquisa, setPesquisa] = React.useState("");

  React.useEffect(() => {
    let body = {
      usu_ativo: ativo ? "S" : "N",
      pesquisa: pesquisa,
    };

    axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/usuario/listar`, body).then((res) => {
      setlistaUsuarios(res.data.message || []);
    });
  }, [visibleModal]);

  const openIncludeUser = (e) => {
    e.preventDefault();
    let body = {
      usuario: {
        usu_cpf: "Temporário",
        usu_email: "Temporário",
        usu_senha: "Temporário",
        usu_ativo: 'S',
      },
    };

    axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/usuario`, body).then((res) => {
      body = {
        usu_ativo: ativo ? "S" : "N",
        pesquisa: pesquisa,
      };

      axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/usuario/listar`, body).then((res) => {
        setlistaUsuarios(res.data.message || []);
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
      usu_ativo: ativo ? "S" : "N",
      pesquisa: pesquisa,
    };

    axios.post(`https://projeto-pedidos-prog-web-api.vercel.app/usuario/listar`, body).then((res) => {
      setlistaUsuarios(res.data.message || []);
    });
  };

  return (
    <Container>
      <HeaderStyle>
        <HeaderText>Usuário</HeaderText>
        <Button onClick={openIncludeUser}>Adicionar Usuário</Button>
      </HeaderStyle>
      <Divider />
      <form>
        <Label>
          Pesquisar:
          <Input
            placeholder="Pesquisa por cpf, descrição.."
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
      <Usuario
        onHide={() => setVisibleModal(false)}
        usuario={
          usuarioSelecionado != undefined ? usuarioSelecionado : {}
        }
        show={visibleModal}
      />
      <Table striped bordered hover size="sm">
        <TableHeader>
          <Linha>
            <Coluna>CPF</Coluna>
            <Coluna>Email</Coluna>
          </Linha>
        </TableHeader>
        <TableBody>
          {listaUsuarios.map((item) => (
            <Linha
              onClick={() => {
                setVisibleModal(true);
                setUsuarioSelecionado(
                  listaUsuarios.find(
                    (eleme) => eleme.usu_cpf == item.usu_cpf
                  )
                );
              }}
            >
              <Coluna>{item.usu_cpf}</Coluna>
              <Coluna>{item.usu_email}</Coluna>
            </Linha>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
