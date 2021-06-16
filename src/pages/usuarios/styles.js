import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    padding: 15px;
    width: 1000px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.3);
    margin-bottom: 15px;
`;

export const HeaderText = styled.span`
    font-size: 26px;
    font-family:'Roboto';
    font-weight: bold;
`;

export const Divider = styled.div`
    display: flex;
    height: 1px;
    margin: 5px 0px 10px;
    background-color: #bfbfbf;
`;

export const Coluna = styled.td`
    &:hover {
        cursor: pointer;
    }
`;

export const Linha = styled.tr`

`;

export const TableBody = styled.tbody`

`;

export const TableHeader = styled.thead`

`;

export const HeaderStyle = styled.div`
display: flex;
flex: 1;
flex-direction: row;
justify-content: space-between;
align-items: center;
max-height: 50px;
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