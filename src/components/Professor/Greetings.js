import React from "react";
import { styled } from "styled-components";
import president from "../../image/20th_president.jpg";

export default function Greetings() {
  return (
    <>
      <Wrapper className="outer">
        <Wrapper className="inner">
          <ProfileContainer>
            <ImageContainer>
              <img src={president} alt="logo" />
            </ImageContainer>
          </ProfileContainer>

          <ContentContainer>
            <TitleBox>
              <p className="title">학회장 인사말</p>
              <p className="head">
                <b>KUBIG</b> 에 <br />
                오신 것을 환영합니다!
              </p>
              <br />
              <p>
                <b>KUBIG</b>은 데이터를 통해 세상을 바라보며, Artificial
                Intelligence를 통해 세계를 바꾸려는 변화의 최전선에 있는
                사람들의 모임입니다.
              </p>
            </TitleBox>

            <TextContainer>
              <Line />
              <TextBox>
                <p>
                  {" "}
                  안녕하세요, KUBIG 20대 학회장 <b>방서연, 정윤주, 하진우</b>
                  입니다. 2024년 현재, 우리는 빠른 혁신의 시대에 살고 있습니다.
                  세계는 방대한 데이터의 흐름 속에서 움직이며, 이러한
                  데이터로부터 얻어진 인사이트는 우리가 의식하지 못하는 사이에
                  더 나은 삶을 추구하는 데 기여하고 있습니다.
                </p>
                <p>
                  학회의 성장에 직접적으로 참여하시는 지도교수님과 더불어 다양한
                  Field의 Alumni들의 도움을 받을 뿐만 아니라, 체계적인 Two-Stage
                  Curriculum으로 발전을 도모하고 있으며, 이를 연간 20여개 이상의
                  수상 경력으로 증명하고 있습니다. KUBIG 학회장단은 KUBIG의
                  일원임을 자부심으로 느끼고 있습니다. 모든 학회원 분들과 이같은
                  자부심을 공유하려 치열하게 부딪히고, 지혜롭게 고민하며, 품격
                  있게 나아가겠습니다.
                </p>
              </TextBox>
            </TextContainer>
          </ContentContainer>
        </Wrapper>
      </Wrapper>
    </>
  );
}
//////////////////////////////////////////////////

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 14%;
  padding-right: 14%;
  min-width: 1080px;

  .outer {
    width: auto;
    justify-content: center;
  }
  .inner {
    width: 80%;
    justify-items: center;
    grid-gap: 10rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 37rem;
`;

const ImageContainer = styled.div`
  img {
    width: 24.625rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: #000;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 180%; /* 2.7rem */
  }

  .title {
    color: #9e1f15;
    /* font-family: Noto Sans; */
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 2.7rem */
  }

  .head {
    color: #000;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 3rem */
    margin-bottom: 0%;
    margin-top: 1rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 5rem;
  padding-top: 3rem;
`;

const Line = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 5.4375rem;
  height: 0.3125rem;
  flex-shrink: 0;
  background: #9e1f15;
  margin-bottom: 1rem;
`;

const TextBox = styled.div`
  width: 50.625rem;
  height: 14.4375rem;
  flex-shrink: 0;
  line-height: 180%;
  color: #000;

  font-style: normal;
  font-weight: 400;
  p {
    margin-top: 1rem;
    font-size: 1.125rem;
  }
`;
