import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderText, MensagemDeErro } from './styles'
import Container from '../../components/container/index'
import { Form, Button } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { Text } from '../../components/padroes/index'
import { UserContext } from '../../context/user';

function App()
{
    const [state, setState] = React.useState({
        user: '',
        password: '',
        passwordError: false
    });

    const { setUserAuthenticated } = useContext(UserContext);
    const history = useHistory();

    const handleOnChange = e =>
    {
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    };

    const handleSubmit = () =>
    {
        console.log('oi')
        if (state.user == 'admin' && state.user == 'admin') {
            setUserAuthenticated();
            history.push('/pedidos');
        } else if (false) {

        } else {
            setState({ ...state, [state.passwordError]: true });
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <HeaderText>Login</HeaderText>
                <Form.Group controlId="formBasicEmail">
                    <Text>Usuário</Text>
                    <Form.Control name='user' type="user" onChange={handleOnChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Text>Senha</Text>
                    <Form.Control name='password' type="password" onChange={handleOnChange} />
                    {state.passwordError ? (<MensagemDeErro>
                        Senha e/ou usuário incorreto!
                    </MensagemDeErro>) : <div />}
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Logar
                </Button>
            </Form>
        </Container>
    );
}

export default App;
