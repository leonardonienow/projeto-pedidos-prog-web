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
import Usuario from "../usuario/index";

function App() {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] =
    React.useState(undefined);
  const [listaUsuarios, setlistaUsuarios] = React.useState([]);

  React.useEffect(() => {
    let body = {
      usu_ativo: "S",
    };

    axios.post(`http://localhost:3333/usuario/listar`, body).then((res) => {
      setlistaUsuarios(res.data.message || []);
    });
  }, [visibleModal]);

  const openIncludeUser = () => {
    let body = {
      usuario: {
        usu_cpf: "Temporário",
        usu_email: "Temporário",
        usu_senha: "Temporário",
        usu_ativo: 'S',
      },
    };

    axios.post(`http://localhost:3333/usuario`, body).then((res) => {
      body = {
        usu_ativo: "S",
      };

      axios.post(`http://localhost:3333/usuario/listar`, body).then((res) => {
        setlistaUsuarios(res.data.message || []);
      });
    });
  };

  return (
    <Container>
      <HeaderStyle>
        <HeaderText>Usuário</HeaderText>
        <Button onClick={openIncludeUser}>Adicionar Usuário</Button>
      </HeaderStyle>
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
