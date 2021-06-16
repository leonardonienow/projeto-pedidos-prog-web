import styled from 'styled-components';


export const HeaderText = styled.text`
    font-weight: bold;
    font-size: 24px;
    font-family:'Roboto';
`;

export const MensagemDeErro = styled.span`
    font-size: 12px;
    font-family:'Roboto';
    color:red;
    align-self: flex-end;
`;

export const ContainerBotoes = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Button = styled.button`
    max-width: 200px;
    border-color: #2f2041;
    background-color: #2f2041;
    padding: 5px 10px 5px 10px;
    color: #fff;
    border-radius: 5px;

  &:hover {
    border-color: #59486c;
    background-color: #59486c;
  }

  &:focus {
    border-color: #59486c;
    background-color: #59486c;
  }
`;


