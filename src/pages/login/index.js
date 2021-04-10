import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, HeaderText, MensagemDeErro } from './styles'
import Container from '../../components/container/index'
import { Form } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { Text } from '../../components/padroes/index'
import { UserContext } from '../../context/user';

function App()
{
    const { setUserAuthenticated, authenticated } = useContext(UserContext);
    const history = useHistory();

    const [state, setState] = React.useState({
        user: '',
        password: '',
        passwordError: false,
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

        if (state.user.toLowerCase() == 'admin' && state.password.toLowerCase() == 'admin') {
            setUserAuthenticated();
            history.push('/pedidos');
        } else if (false) {

        } else {
            setState({ ...state, ['passwordError']: true });
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
