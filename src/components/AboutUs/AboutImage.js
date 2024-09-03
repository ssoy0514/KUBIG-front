import { styled } from "styled-components";
import AboutImg from "../../image/AboutUsImage.png";
import Container from "react-bootstrap/Container";

export default function AboutImage() {
  return (
    <Container>
      <AboutImageContainer>
        <AboutTextContainer>
          <h1>About Us</h1>
        </AboutTextContainer>
      </AboutImageContainer>
    </Container>
  );
}
const AboutImageContainer = styled.div`
  width: 100%;
  height: 27.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    url(${AboutImg}), lightgray 50% / cover no-repeat;
  background-size: cover;
`;
const AboutTextContainer = styled.div`
  h1 {
    color: #fff;
    text-align: center;
    font-size: 3rem;
    font-style: normal;
    font-weight: 800;
    line-height: 180%; /* 9rem */
  }
`;
