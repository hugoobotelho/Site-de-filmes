import { createGlobalStyle } from "styled-components";
import Colors from "./constants/Colors";

const globalStyle = createGlobalStyle `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    };
    body {
        background-color: ${Colors.preto};
        font-family: 'Poppins';
    }
`

export default globalStyle;