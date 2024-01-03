import styled from "styled-components";

interface HeaderStyleProps {
    width?: string 
}

export const HeaderContainer = styled.div<HeaderStyleProps>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 10px;
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;

    max-width: ${({width}) => width ? width : '1440px'};
`