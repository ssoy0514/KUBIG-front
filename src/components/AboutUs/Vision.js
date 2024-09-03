import { styled } from "styled-components";
import Diagram from "../../image/Diagram.svg";

export default function Vision() {
  return (
    <Wrapper>
      <ContentWrapper>
        <TextContainer>
          <h1>Vision</h1>
          <h2>
            고려대학교를 대표하는
            <br /> 미래 데이터 사이언티스트들의{" "}
            <strong>학술적 교류의 장</strong>
          </h2>
          <ul className="detail">
            <li>
              • 데이터 사이언스에 열정과 흥미를 가진 학내 구성원들 간의
              네트워크를 형성한다.
            </li>
            <li>
              {" "}
              • 수리통계학적 데이터 사이언스 학습을 통해 깊이 있는 이해와 이론적
              기반을 다진다.{" "}
            </li>
            <li>
              • 팀 프로젝트를 통해 데이터 사이언스가 적용되는 다양한 분야에 대한
              이해와 함께 협동심을 키운다.
            </li>
            <li>
              • 학회원들이 데이터 사이언티스트로서 필요한 비판적 사고능력, 문제
              해결 능력을 증진한다.
            </li>
          </ul>
        </TextContainer>
        <ImageContainer>
          <img src={Diagram} alt="" />
        </ImageContainer>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding-left: 14%;
  padding-right: 14%;
  padding-top: 8rem;
  padding-bottom: 8rem;
  background: #f9fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  //min-width: 1080px;
  height: max-content;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4%;
`;

const TextContainer = styled.div`
  display: inline-block;
  width: 55%;

  h1 {
    color: #9e1f15;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 3rem;
    margin: 0;
  }
  h2 {
    /* title-bold */
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 180%;
    margin: 0;
  }

  strong {
    color: #9e1f15;
  }
  ul {
    padding-top: 3rem;
    padding-left: 0;
  }
  li {
    /* white-space: nowrap; */
    font-size: 1rem;
    font-weight: 400;
    line-height: 180%;
  }
`;

const ImageContainer = styled.div`
  display: inline-block;
  width:50%;
  //adding-left: 5.75rem;
  margin-left: auto;
  padding-top: 5vh;
  img {
    float: right;
    width: 100%;
  }
`;
