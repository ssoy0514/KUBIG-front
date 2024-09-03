import { styled } from "styled-components";
import MainImg from "../../image/MainImage.png";
import KubigWhiteLogo from "../../image/KubigWhiteLogo.svg";

export default function MainImage() {
  return (
    <MainImageContainer>
      <MainLogoContainer>
        <img src={KubigWhiteLogo} alt="" />
        <h2>KOREA UNIV. DATA SCIENCE SOCIETY</h2>
      </MainLogoContainer>
    </MainImageContainer>
  );
}
const MainImageContainer = styled.div`
  width: 100%;
  height: 35rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    url(${MainImg}), lightgray 50% / cover no-repeat;
  background-size: cover;
`;

const MainLogoContainer = styled.div`
  text-align: center;
  h2 {
    color: #fff;
    font-weight: 300;
    font-size: 1.5rem;
    line-height: 300%;
  }
`;
