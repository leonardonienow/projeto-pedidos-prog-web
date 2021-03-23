import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { HeaderText, Divider } from './styles'

function App()
{
    const [state, setState] = React.useState({
    });

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
        <div>
            <HeaderText>Pedidos</HeaderText>
            <Divider />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>CPF</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidos.map((item) => (
                        <tr>
                            <td>{item.ped_numero}</td>
                            <td>{item.usu_cpf}</td>
                            <td>{item.ped_datahora}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default App;
