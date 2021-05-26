import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { TableBody, TableHeader, Linha, Coluna, HeaderText, Divider, Container, HeaderStyle, Button } from './styles'
import Categoria from '../categoria/index'

function App()
{
    const [state, setState] = React.useState({});
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [categoriaSelecionado, setCategoriaSelecionado] = React.useState(undefined);

    const listaCategorias = [{
        'cat_codigo': '1',
        'cat_descricao': 'GERAL',
        'cat_ativa': 'S',
    }, {
        'cat_codigo': '2',
        'cat_descricao': 'TESTE',
        'cat_ativa': 'S',
    },];

    return (
        <Container>
            <HeaderStyle>
                <HeaderText>Categorias</HeaderText>
                <Button onClick={() => { }}>Adicionar Categoria</Button>
            </HeaderStyle>
            <Divider />
            <Categoria
                onHide={() => setVisibleModal(false)}
                categoria={categoriaSelecionado != undefined ? categoriaSelecionado : {}}
                show={visibleModal}
            />
            <Table striped bordered hover size="sm">
                <TableHeader>
                    <Linha>
                        <Coluna>Código</Coluna>
                        <Coluna>Descrição</Coluna>
                        <Coluna>Status</Coluna>
                    </Linha>
                </TableHeader>
                <TableBody>
                    {listaCategorias.map((item) => (
                        <Linha onClick={() =>
                        {
                            setVisibleModal(true)
                            setCategoriaSelecionado(listaCategorias.find(eleme => eleme.cat_codigo == item.cat_codigo))
                        }}>
                            <Coluna>{item.cat_codigo}</Coluna>
                            <Coluna>{item.cat_descricao}</Coluna>
                            <Coluna>{item.cat_ativa == "S" ? "ATIVO" : "INATIVO"}</Coluna>
                        </Linha>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}

export default App;
