import React from "react";
import { styled } from "styled-components";
import TeamImg from "../../../image/TeamsImg.svg";

export default function Teams() {
  return (
    <Wrapper>
      <ImageContainer>
        <img src={TeamImg} alt="logo" />
      </ImageContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  background: #f9fafc;
  justify-content: center;
  align-items: center;
  height: 60rem;
  margin-top: 7rem;
`;

const ImageContainer = styled.div`
  padding: 10rem;
  img {
    width: 70rem;
  }
`;
