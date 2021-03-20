import React, { useContext } from 'react';

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
            {
                listaPedidos.map((item) => (
                    <>
                        <span>{item.ped_numero}></span>
                        <span>{item.usu_cpf}</span>
                        <span>{item.ped_datahora}</span>
                        <span>{item.ped_entregue}</span>
                        <span>{item.ped_ativo}</span>
                    </>
                ))
            }
        </div>
    );
}

export default App;
