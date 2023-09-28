import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
    --primary: #494949;
    --secondary:  #ccc;
    --third: #aaa;
    --on-primary: #fafafa;
    --on-secondary: #000504;
    --buttonEnter: #5cb86f;
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
    background-color: #494949;
    min-height: 100vh;
    overflow: auto;
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
}

body::-webkit-scrollbar {
    width: 6px;
    background-color: transparent; }
`;
