import styled from "styled-components";
import Colors from "../constants/Colors";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 34px;
    padding: 34px;
    overflow: auto;
`;

const Title = styled.h1`
    font-size: 28px;
    color: ${Colors.branco};
    font-weight: 600;
`;

export {Container, Title}