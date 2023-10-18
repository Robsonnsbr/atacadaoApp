import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
    --primary: #fafafa;
    --primary-transparent: rgb(250,250,250, 0.5);
    --secondary:  #ebebeb;
    --third: #f63;
    --third-transparent: rgb(255,102,51, 0.3);
    --on-primary: #fff;
    --on-secondary: #000;
    --buttonDelete: #b85c5c;
    --successfully: #093;
    --error: #f00;
    --text-shadow-style: 0px 0px 1px  rgb(0,0,0, 0.2);
}

* {
    letter-spacing: 1px;
    padding: 0;
    margin: 0;
    vertical-align: baseline;
    list-style: none;
    border: 0;
    box-sizing: border-box;

h1, h2 {
    margin: 5px;
    color: var(--on-secondary);
    text-align: center;

}
p {
    font-size: 14px;
    font-weight: 600;
}

h1 {
    font-size: 20px;
    text-shadow: 1px 1px 2px #0000006f;
}
h2 {
    font-size: 18px;
    text-shadow: 0.5px 0.5px 1px #0000004f;
}

}
*::before,
::after {
    box-sizing: inherit;
}


html,
body {
    padding-top: 35px !important;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: var(--primary);
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


/* body::-webkit-scrollbar {
    width: 6px;
    background-color: transparent; } */
`;
