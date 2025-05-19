import styled from "styled-components";
import Colors from "../constants/Colors";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 34px;
    flex-direction: row;
    height: 34px;
    width: 100%;
    background-color: ${Colors.cinzaEscuro};
`;

const BackIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: solid 1px ${Colors.branco};
    border-radius: 10px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        border-color: ${Colors.cinzaMedio};
    }

`;

export {Container, BackIcon}