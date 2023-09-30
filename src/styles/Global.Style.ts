import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
    --primary: #fafafa;
    --secondary:  #ebebeb;
    --third: #f63;
    --fourth: #093;
    --on-primary: #fff;
    --on-secondary: #000504;
    --buttonEnter: #093;
    --buttonDelete: #b85c5c;
    --error: #f00;
}

* {

    padding: 0;
    margin: 0;
    vertical-align: baseline;
    list-style: none;
    border: 0;
    box-sizing: border-box;
}
*::before,
::after {
    box-sizing: inherit;
}


html,
body {
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #fafafa;
    min-height: 100vh;
    overflow: auto;
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
}

//background
html,
body {
    background: url("atacadao-background.jpg") no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
}


body::-webkit-scrollbar {
    width: 6px;
    background-color: transparent; }
`;
