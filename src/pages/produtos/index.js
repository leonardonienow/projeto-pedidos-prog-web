import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { TableBody, TableHeader, Linha, Coluna, HeaderText, Divider, Container, HeaderStyle, Button } from './styles'
import Produto from '../produto/index'

function App()
{
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = React.useState(undefined);

    const listaProdutos = [{
        'pro_codigo': '123',
        'pro_descricao': 'SABÃO EM PÓ',
        'pro_valor': 10.00,
        'cat_id': '2',
        'cat_descricao': 'TESTE',
        'pro_ativo': 'S',
    },
    {
        'pro_codigo': '124',
        'pro_descricao': 'SABÃO EM LIQUIDO',
        'pro_valor': 24.00,
        'cat_id': '1',
        'cat_descricao': 'GERAL',
        'pro_ativo': 'S',
    },
    {
        'pro_codigo': '125',
        'pro_descricao': 'SABONETE YPE',
        'pro_valor': 1.60,
        'cat_id': '1',
        'cat_descricao': 'GERAL',
        'pro_ativo': 'S',
    },
    {
        'pro_codigo': '126',
        'pro_descricao': 'COCA COLA 2L',
        'pro_valor': 6.60,
        'cat_id': '2',
        'cat_descricao': 'TESTE',
        'pro_ativo': 'S',
    }
    ];

    return (
        <Container>
            <HeaderStyle>
                <HeaderText>Produtos</HeaderText>
                <Button onClick={() => { }}>Adicionar Produto</Button>
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
                        <Linha onClick={() =>
                        {
                            setVisibleModal(true)
                            setProdutoSelecionado(listaProdutos.find(eleme => eleme.pro_codigo == item.pro_codigo))
                        }} >
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
