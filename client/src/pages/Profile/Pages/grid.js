import styled from "styled-components";

export const FlexContainer = styled.div`
  position: relative;
  display: flex;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  height: 100%;
  width: 100%;

  @media (max-width: 1440px) {
    grid-template-columns: 25% 75%;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 100%;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 100%;
  }
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
  @media (max-width: 480px) {
    grid-template-columns: 100%;
  }
`;

export const Card = styled.div`
  background-size: cover;
  background-position: center;
  margin: 6px;
  width: 100%;
  border-radius: 1px;
`;
