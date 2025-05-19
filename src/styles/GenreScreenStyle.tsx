import styled from "styled-components";
import Colors from "../constants/Colors";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 500px; */
    color: ${Colors.branco};
    padding: 38px;
    gap: 50px;
    overflow-y: auto;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: 600;
`;


export {Container, Title}