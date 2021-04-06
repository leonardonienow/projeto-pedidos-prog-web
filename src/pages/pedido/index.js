import React from 'react'
import { Modal, Tab, Tabs, Table } from 'react-bootstrap';
import { TabsStyled, TabStyled, Button, LinhaDadoStyle, ContainerTabStyle, LinhaTabStyle, ContainerFooterStyle, ContainerFooterRightButtonStyle, ContainerFooterLeftButtonStyle } from './styles'
import './styles.css'
var dateFormat = require("dateformat");

const listaProdutos = [{
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
}, {
    'ped_numero': '123',
    'pro_codigo': '1',
    'pro_valor': '6',
    'pro_descricao': 'SABÃO EM PÓ',
},
];


function Pedido(props)
{
    props.pedido.ped_datahora = Date.parse(props.pedido.ped_datahora);
    const [refresh, setRefresh] = React.useState(false);

    const AtualizarPagina = () =>
    {
        setRefresh(!refresh);
    }

    const handleButtonFechar = () =>
    {
        props.onHide();
    }

    const handleButtonSalvar = () =>
    {
        AtualizarPagina();
    }

    const handleButtonExcluir = () =>
    {
        props.onHide();
    }

    const handleButtonAdcionarProduto = () =>
    {
        setRefresh(!refresh);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Pedido - {props.pedido.ped_numero}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs cd="uncontrolled-tab-example">
                    <Tab tabClassName='tabStyle' eventKey="home" title="Dados">
                        <ContainerTabStyle>
                            <tbody>
                                <tr>
                                    <td>CPF:</td>
                                    <td><LinhaDadoStyle>{props.pedido.ped_numero}</LinhaDadoStyle></td>
                                </tr>
                                <tr>
                                    <td>Data:</td>
                                    <td><LinhaDadoStyle>{dateFormat(props.pedido.ped_datahora, "dd/mm/yyyy")}</LinhaDadoStyle></td>
                                </tr>
                                <tr>
                                    <td>Entregue:</td>
                                    <td><LinhaDadoStyle>{props.pedido.ped_entregue == 'S' ? 'NÃO' : 'SIM'}</LinhaDadoStyle></td>
                                </tr>
                            </tbody>
                        </ContainerTabStyle>
                    </Tab>
                    <Tab tabClassName='tabStyle' eventKey="profile" title="Produtos" >
                        <ContainerTabStyle>
                            <Button onClick={handleButtonAdcionarProduto}>Adicionar Produto</Button>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaProdutos.map((item) => (
                                        <tr >
                                            <td>{item.pro_codigo}</td>
                                            <td>{item.pro_descricao}</td>
                                            <td>{item.pro_valor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </ContainerTabStyle>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <ContainerFooterStyle>
                    <ContainerFooterLeftButtonStyle>
                        <Button onClick={handleButtonExcluir}>Excluir</Button>
                    </ContainerFooterLeftButtonStyle>
                    <ContainerFooterRightButtonStyle>
                        <Button onClick={handleButtonSalvar}>Salvar</Button>
                        <Button onClick={handleButtonFechar}>Fechar</Button>
                    </ContainerFooterRightButtonStyle>
                </ContainerFooterStyle>
            </Modal.Footer>
        </Modal>
    );
}

export default Pedido;
