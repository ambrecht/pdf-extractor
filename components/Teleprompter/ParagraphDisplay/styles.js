import styled, { keyframes } from 'styled-components';

const waveColor = keyframes`
  0% {
    color: initial;
  }
  50% {
    color: ${(props) => props.color};
  }
  100% {
    color: initial;
  }
`;

const StyledDiv = styled.div`
  overflow-y: auto;
  max-height: 100vh;
  max-width: 100vw;
  flex-grow: 1;
  background-color: ${(props) => props.bgColor};
  padding: 1rem;
`;

const StyledParagraph = styled.p`
  font-weight: 600;
  text-align: ${(props) => props.align};
  margin: 0.5rem 1rem;
  line-height: 1.75;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  word-wrap: break-word;
`;
const StyledSpan = styled.span`
  color: ${(props) => props.color};
  animation: ${(props) => (props.animate ? waveColor : 'none')}
    ${(props) => (props.isTarget ? '1s' : '0s')} infinite;
  transition: color 0.3s ease;
`;

const ProgressBar = styled.div`
  height: 0.25rem;
  background-color: ${(props) => props.bgColor || 'white'};
  width: ${(props) => `${props.progress}%`};
`;

export { StyledDiv, StyledParagraph, StyledSpan, ProgressBar };
