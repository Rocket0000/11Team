import styled from "styled-components";


export const BoardBg = styled.section<{margin?: string, height?: string, width?: string}>`
    width: ${ props => props.width};
    height: ${ props => props.height };
    padding: 20px 0;
    margin: ${ props => props.margin}; //일단 보기 편해서 넣음 지울거임
    background-color: #FFF;
    border-radius: 8px;
    filter: drop-shadow(0px 3.20559px 32.0559px rgba(0, 0, 0, 0.08));
`;
