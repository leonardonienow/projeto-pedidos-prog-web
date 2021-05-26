import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, HeaderText, MensagemDeErro } from './styles'
import Container from '../../components/container/index'
import { Form } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { Text } from '../../components/padroes/index'
import { UserContext } from '../../context/user';
import { CommonLoading } from 'react-loadingg';
const apiApplication = require('../../services/apiApplication')

function App()
{
    const { setUserAuthenticated, authenticated } = useContext(UserContext);
    const history = useHistory();

    const [state, setState] = React.useState({
        user: '',
        password: '',
        passwordError: false,
        passwordMessage: '',
        //loading: false,
    });

    React.useEffect(() =>
    {
        if (authenticated) history.replace('/');
    }, [authenticated, history]);


    const handleOnChange = e =>
    {
        const { name, value } = e.target;

        setState({ ...state, [name]: value });
    };

    const handleSubmit = async e =>
    {
        e.preventDefault();

        try {
            let params = [state.user.trim(), state.password.trim()];
            let auth = await apiApplication.post('/login', params);

            if (auth !== false) {
                setUserAuthenticated();
                history.push('/pedidos');
            }
            else {
                setState({ ...state, ['passwordError']: true });
                setState({ ...state, ['passwordMessage']: 'Usuário e/ou senha incorreta!' });
            }
        } catch (e) {
            setState({ ...state, ['passwordMessage']: 'Problemas ao efetuar Login!' });
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <HeaderText>Login</HeaderText>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control name='user' type="user" onChange={handleOnChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control name='password' type="password" onChange={handleOnChange} />
                    {state.passwordError ? (<MensagemDeErro>
                        {state.passwordMessage}
                    </MensagemDeErro>) : <div />}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Logar
                </Button>
            </Form>
        </Container>
    );
}

export default App;
