import styled from "styled-components";
import Colors from "../constants/Colors";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 288px;
    width: 188px;
    background-color: ${Colors.cinzaMedioEscuro};
    border-radius: 5px;
`;

const Image = styled.img`
    width: 100%;
    background-color: ${Colors.branco};
    height: 70%;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
`;

const Info = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 10px;
`;

const Nota = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

export {Container, Image, Info, Nota}