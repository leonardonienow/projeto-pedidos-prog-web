import { Modal, Button, Tab, Tabs } from 'react-bootstrap';
import { ContainerFooterStyle, ContainerFooterRightButtonStyle, ContainerFooterLeftButtonStyle } from './styles'
import './styles.css'

function Pedido(props)
{
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
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                        <div>Tab Dados</div>
                    </Tab>
                    <Tab tabClassName='tabStyle' eventKey="profile" title="Produtos" >
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                        <div>Tab Produtos</div>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <ContainerFooterStyle>
                    <ContainerFooterLeftButtonStyle>
                        <Button className='button'>Excluir</Button>
                    </ContainerFooterLeftButtonStyle>
                    <ContainerFooterRightButtonStyle>
                        <Button className='button'>Salvar</Button>
                        <Button className='button'>Fechar</Button>
                    </ContainerFooterRightButtonStyle>
                </ContainerFooterStyle>
            </Modal.Footer>
        </Modal >
    );
}

export default Pedido;
