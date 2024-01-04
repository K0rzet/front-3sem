import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
 :root {
    --font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
    --line-height: 1.5;
    --font-weight: 400;

    --color-scheme: light dark;
    --text-color-light: rgba(0, 0, 0, 0.87);
    --text-color-dark: rgba(255, 255, 255, 0.87);
    --background-color-light: #ffffff;
    --background-color-dark: #242424;

    --font-synthesis: none;
    --text-rendering: optimizeLegibility;
    --webkit-font-smoothing: antialiased;
    --moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    font-family: var(--font-family);
    line-height: var(--line-height);
    font-weight: var(--font-weight);
    font-synthesis: var(--font-synthesis);
    text-rendering: var(--text-rendering);
    -webkit-font-smoothing: var(--webkit-font-smoothing);
    -moz-osx-font-smoothing: var(--moz-osx-font-smoothing);
  }

  [data-theme="light"] {
    body {
      background-color: var(--background-color-light);
      color: var(--text-color-light);
    }
  }

  [data-theme="dark"] {
    body {
      background-color: var(--background-color-dark);
      color: var(--text-color-dark);
    }
  }

  a:visited {
    color: inherit;
  }
`;
