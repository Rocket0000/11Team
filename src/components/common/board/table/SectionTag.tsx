import styled from "styled-components";

interface SectionProps{
  display?: string;
  padding?: string; 
  margin?: string; 
  width?: string;
  height? : string; 
}

export const SectionTag = styled.section<SectionProps>`
  display: ${ props => props.display ? props.display : 'block' };
  justify-content: ${ props => props.display === 'flex' ? 'flex-end' : ''};
  width: ${ props => props.width };
  height: ${ props => props.height ? props.height : '100%'};
  padding: ${ props => props.padding };
  margin: ${ props => props.margin };

  background: transparent;
`