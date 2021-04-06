import styled from 'styled-components';
import { Tab, Tabs, Table } from 'react-bootstrap';

export const ContainerFooterStyle = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

export const ContainerFooterRightButtonStyle = styled.div`
    display: flex;
    align-self: flex-start;
`;

export const ContainerFooterLeftButtonStyle = styled.div`
    display: flex;
    flex: 1;
    align-self: flex-end;
`;

export const ContainerTabStyle = styled.div`
    flex-direction: column;
    height: 400px;
    overflow-y: scroll;
    white-space: nowrap;
`;
export const LinhaTabStyle = styled.div`
    flex-direction: column;
    margin-top: 2px;
`;

export const LinhaDadoStyle = styled.span`
    margin-left: 5px;
    font-weight: bold;
`;

export const Button = styled.button`
    max-width: 200px;
    margin: 5px;
    border-color: #2f2041;
    background-color: #2f2041;
    padding: 5px 10px 5px 10px;
    color: #fff;
    border-radius: 5px;

  &:hover {
    margin: 5px;
    border-color: #59486c;
    background-color: #59486c;
  }

  &:focus {
    margin: 5px;
    border-color: #59486c;
    background-color: #59486c;
  }
`;


