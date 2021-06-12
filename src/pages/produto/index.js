import React, { View } from 'react'
import { Modal, Dropdown, Form, Col, Row } from 'react-bootstrap';
import { TableBody, DropDownStyle, Linha, Coluna, LinhaDadoStyle, ContainerStyle, Button, ContainerFooterStyle, ContainerFooterRightButtonStyle, ContainerFooterLeftButtonStyle } from './styles'
import './styles.css'

let categorias = [{
    'cat_id': '1',
    'cat_descricao': 'GERAL',
},
{
    'cat_id': '2',
    'cat_descricao': 'TESTE',
},
];

function Produto(props)
{
    const [refresh, setRefresh] = React.useState(false);

    // #region Funções

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

    const RetornaCategoriaSelecionada = () =>
    {
        
        let categoriaSelecionada = categorias.find(element => element.cat_id == props.produto.cat_id);

        if (categoriaSelecionada) {
            return categoriaSelecionada.cat_descricao;
        }

        return '';
    }

    const handleOnChange = e =>
    {
        const { name, value } = e.target;
        let valor = value;

        if (name == 'pro_valor' && valor == '') {
            valor = 0;
        }

        props.produto[name] = valor;

        AtualizarPagina();
    };

    // #endregion

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Produto - {props.produto.pro_codigo}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ContainerStyle>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column size='sm' sm="2" >Descrição:</Form.Label>
                            <Col>
                                <Form.Control name='pro_descricao' onChange={handleOnChange} column size='sm' sm="1" type="input" value={props.produto.pro_descricao} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column size='sm' sm="2" >Valor:</Form.Label>
                            <Col>
                                {/* <Form.Control name='pro_descricao' onChange={handleOnChange} column size='sm' sm="1" type="input" value={props.produto.pro_descricao} /> */}
                                <Form.Control name='pro_valor' type='input' onChange={handleOnChange} column size='sm' value={props.produto.pro_valor} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column size='sm' sm="2" >Categoria:</Form.Label>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant='secondary' size="sm">
                                        {
                                            RetornaCategoriaSelecionada()
                                        }
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu size="sm">
                                        {
                                            categorias.map(item => (
                                                <Dropdown.Item eventKey={item.cat_id} onSelect={(item) =>
                                                {
                                                    props.produto.cat_id = item;
                                                    AtualizarPagina()
                                                }}>
                                                    {item.cat_descricao}</Dropdown.Item>
                                            ))
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Form.Group>
                    </Form>
                </ContainerStyle>
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

export default Produto;
