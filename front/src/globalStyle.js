import {createGlobalStyle} from "styled-components";
import fundo from './assets/images/fundo.png'
// estilos que são aplicados em toda página do site
export default createGlobalStyle `
    *{
        padding: 0;
        margin: 0;
        font-family: 'Roboto'
        box-sizing: border-box;
    }

    body{
      background-image: url(${fundo});
      background-size: 100%;
    }
`;