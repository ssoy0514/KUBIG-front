import { styled } from "styled-components";

export const StudyAndProjectWrapper = styled.div`
  width: 78%;
  padding-right: 3vw;
  padding-bottom: 5vh;
  padding-top: 3rem;
  h1 {
    color: #9e1f15;
  }
`;
export const HeaderContainer = styled.div`
  margin-bottom: 2rem;

  display: flex;
  align-items: center;
  & button {
    margin-left: auto;
    height: 2.5rem;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 1.12rem;
  flex-wrap: wrap;
  padding-bottom: 2vh;
  a {
    width: 23%;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h3 {
    font-weight: 700;
  }
  h5 {
    color: #9fa0a7;
    font-size: 0.875rem;
    font-weight: 400;
  }
`;
export const ContentImageContainer = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 16 / 9;


  &::after {
    display: block;
    content: "";
  }
  img {
    position: absolute;
    width: 100%;
    border-radius: 0.3125rem;
    object-fit: contain;
    aspect-ratio: 16 / 9;
  }
`;
export const ItemWrapper = styled.div`
  width: 70%;
  padding-left: 5%;
  padding-top: 1.5rem;
`;
// export const ContentAndBtn = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-right: 5vw;
// `;
