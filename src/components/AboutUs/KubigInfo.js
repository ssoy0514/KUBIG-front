import { styled } from "styled-components";
import Logo from "../../image/KUBIG_logo-01.png";

export default function KubigInfo() {
  return (
    <>
      <MainTextContainer>
        <h2>
          데이터로 세상을 꿰뚫어보는, <strong>KUBIG</strong> 입니다.
        </h2>
        <h2>고려대학교 데이터 사이언스 & AI 학회</h2>
      </MainTextContainer>
      <Wrapper>
        <ContentWrapper>
          <TextContainer>
            <h1>Who We Are</h1>
            <p>
              <strong> 고려대학교 데이터 사이언스 & AI 학회 KUBIG</strong>은 데이터
              사이언스에 관심이 있는 학생들끼리 
              같이 공부하며 학습 네트워크를 형성하는 교내 학회입니다. <br />
              <br />
              2015년 <strong>고려대학교 빅데이터 연구회</strong>라는 이름으로
              통계학과에서 출범한 <strong>KUBIG</strong>은 그간 학회원들의
              열정과 역량에 힘입어 이제 고려대학교를 대표하는 데이터 사이언스 학회가 되었습니다. <br />
              2023년에는 <strong>임성빈 지도교수님 선임</strong>과 함께 <strong>고려대학교 데이터 사이언스 & AI 학회</strong>로 학회명{" "}을 변경하고 더 높은 곳으로 비상할 준비를 마쳤습니다.
              <br />
              <br /> <strong>KUBIG</strong>은 학과, 학부/대학원 등 소속에
              구애받지 않고{" "}
              <strong>
                데이터 분석 및 인공지능 등에 관심이 있는 고려대학교 학생이라면
                누구나
              </strong>{" "}
              함께할 수 있습니다. 다양한 배경지식과 수준을 가진 사람들이
              함께하는 만큼 학회는{" "}
              <strong>
                방학 중 파이썬 기초부터 심화 CV/NLP 까지 폭넓은 스터디
              </strong>
              를 운영하고 있으며,{" "}
              <strong>학기 중에는 방학 때 배운 내용을 바탕으로 프로젝트</strong>
              를 진행함으로써 학회원들이 실전 감각을 키워 역량을 극대화하도록
              적극 지원하고 있습니다. <strong>KUBIG</strong>은 학회원들에게 더욱
              풍성한 기회를 제공하기 위해 노력할 것이며, 동시에 열정 있는
              인재들을 더욱 많이 모집하기 위해 최선을 다할 것입니다.
            </p>
          </TextContainer>
          <ImageContainer>
            <img src={Logo} alt="logo" />
          </ImageContainer>
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 8rem;
  padding-bottom: 8rem;
  align-items: center;
  height: max-content;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4%;
`;

const MainTextContainer = styled.div`
  color: #000;
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 180%; /* 3.6rem */
  margin-top: 5rem;
  margin-bottom: 3rem;

  strong {
    color: #9e1f15;
  }
`;

const TextContainer = styled.div`
  display: inline-block;
  width: 55%;

  h1 {
    color: #9e1f15;
    margin-bottom: 3.375rem; //54px;
    font-weight: 700;
    font-size: 2rem; //32px;
  }
  p {
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 180%;
    //min-width: 38rem;
  }
  strong {
    color: #000;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 180%;
  }
`;

const ImageContainer = styled.div`
display: inline-block;
  width: 40%;
  margin-left: auto;
  //padding-top: 5vh;
  img {
    float: right;
    width: 100%;
    box-shadow: 0 4px 16px rgb(0,0,0,0.2);
    // border-radius: 50%;
  }
  //flex-shrink: 0;
  //padding-left: 2rem;
`;
