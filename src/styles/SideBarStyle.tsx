import styled from "styled-components";
import Colors from "../constants/Colors";

interface Props {
    isActive: boolean;
}

const Container = styled.div`
    background-color: ${Colors.cinzaEscuro};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 25vh;
    flex-direction: column;
    gap: 24px;
    width: 200px;
    border-right: solid 1px  ${Colors.cinzaMedio};
`;

const ButtonRouter = styled.li<Props>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    list-style: none;
    background-color: ${({ isActive }) => isActive ? Colors.vermelho : Colors.cinzaEscuro};
    border-radius: 10px;
    transition: 0.3s;
    padding: 10px 20px 10px 20px;
    gap: 10px;



    &:hover {
        background-color: ${Colors.vermelho};
    }

    a {
        color: ${Colors.branco};
        text-decoration: none;
        /* padding: 10px 20px 10px 20px; */
        display: flex;
        align-items: center; /* Center the icon and text vertically */
        text-align: left;
        font-size: 16px;
        font-weight: 600;
    }

`;

export { Container, ButtonRouter }