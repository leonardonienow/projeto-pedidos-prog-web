import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { TableBody, TableHeader, Linha, Coluna, HeaderText, Divider, Container, Button, HeaderStyle } from './styles'
import Pedido from '../pedido/index'

function App()
{
    const [state, setState] = React.useState({});
    const [visibleModal, setVisibleModal] = React.useState(false);
    const [pedidoSelecionado, setPedidoSelecionado] = React.useState(undefined);

    const listaPedidos = [{
        'ped_numero': '123',
        'usu_cpf': '846.540.650-24',
        'ped_datahora': '2021-20-03 12:54:00',
        'ped_entregue': 'N',
        'ped_ativo': 'S',
    },
    {
        'ped_numero': '124',
        'usu_cpf': '925.715.190-50',
        'ped_datahora': '2021-20-03 12:54:00',
        'ped_entregue': 'N',
        'ped_ativo': 'S',
    },
    {
        'ped_numero': '125',
        'usu_cpf': '712.032.500-02',
        'ped_datahora': '2021-20-03 12:54:00',
        'ped_entregue': 'N',
        'ped_ativo': 'S'
    },
    {
        'ped_numero': '126',
        'usu_cpf': '561.026.400-63',
        'ped_datahora': '2021-20-03 12:54:00',
        'ped_entregue': 'N',
        'ped_ativo': 'S',
    },
    ];

    return (
        <Container>
            <HeaderStyle>
                <HeaderText>Pedidos</HeaderText>
                <Button onClick={() => { }}>Adicionar Pedido</Button>
            </HeaderStyle>
            <Divider />
            <Pedido
                onHide={() => setVisibleModal(false)}
                pedido={pedidoSelecionado != undefined ? pedidoSelecionado : {}}
                show={visibleModal}
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
                        <Linha onClick={() =>
                        {
                            setVisibleModal(true)
                            setPedidoSelecionado(listaPedidos.find(eleme => eleme.ped_numero == item.ped_numero))
                        }}>
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
