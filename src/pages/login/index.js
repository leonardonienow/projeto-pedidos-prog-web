import { Panel } from './styles'
import Container from '../../components/container/index'
function App()
{
    return (
        <Container>
            <Panel>
                <label>Usuário: </label>
                <input></input>
                <label>Senha: </label>
                <input></input>
            </Panel>
        </Container>
    );
}

export default App;
