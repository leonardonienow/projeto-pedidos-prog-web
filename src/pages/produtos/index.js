import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { HeaderText, Divider, Container } from './styles'
import Pedido from '../pedido/index'

function App()
{
    const [state, setState] = React.useState({});
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [pedidoSelecionado, setPedidoSelecionado] = React.useState(undefined);

    const listaPedidos = [{
        'pro_codigo': '123',
        'pro_descricao': 'SABÃO EM PÓ',
        'pro_valor': '10',
        'cat_descricao': 'GERAL',
        'pro_ativo': 'S',
    },
    {
        'pro_codigo': '124',
        'pro_descricao': 'SABÃO EM LIQUIDO',
        'pro_valor': '24',
        'cat_descricao': 'GERAL',
        'pro_ativo': 'S',
    },
    {
        'pro_codigo': '125',
        'pro_descricao': 'SABONETE YPE',
        'pro_valor': '1.60',
        'cat_descricao': 'GERAL',
        'pro_ativo': 'S',
    },
    {
        'pro_codigo': '126',
        'pro_descricao': 'COCA COLA 2L',
        'pro_valor': '6.60',
        'cat_descricao': 'GERAL',
        'pro_ativo': 'S',
    }
    ];

    return (
        <Container>
            <HeaderText>Produtos</HeaderText>
            <Divider />
            <Pedido
                onHide={() => setVisibleModal(false)}
                pedido={pedidoSelecionado != undefined ? pedidoSelecionado : {}}
                show={visibleModal}
            />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidos.map((item) => (
                        <tr onClick={() =>
                        {
                            setVisibleModal(true)
                            setPedidoSelecionado(listaPedidos.find(eleme => eleme.ped_numero == item.ped_numero))
                        }} >
                            <td>{item.pro_codigo}</td>
                            <td>{item.pro_descricao}</td>
                            <td>{item.cat_descricao}</td>
                            <td>{Number.parseFloat(item.pro_valor).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default App;
