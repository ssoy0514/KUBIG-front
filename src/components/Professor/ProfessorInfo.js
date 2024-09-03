import React from "react";
import { styled } from "styled-components";
import ProfessorImg from "../../image/professor.png";

export default function ProfessorInfo() {
  return (
    <>
      <Wrapper className="outer">
        <Wrapper className="inner">
          <ProfileContainer>
            <ImageContainer>
              <img src={ProfessorImg} alt="professor" />
            </ImageContainer>

            <Name>
              <p>지도교수</p>
              <p className="name">
                <b>임성빈(林聖彬)</b>
              </p>
            </Name>
          </ProfileContainer>

          <ContentContainer>
            <TitleBox>
              <p className="head">
                안녕하세요, KUBIG 지도교수
                <br />
                <b>고려대학교 통계학과 임성빈 교수입니다. </b>
              </p>
            </TitleBox>

            <TextContainer>
              <Line />
              <TextBox>
                <p>
                  급속도로 발전하는 데이터 엔지니어링과 인공지능 기술로 인해
                  우리 사회를 포함한 전세계의 과학, 산업, 교육 등이 큰 변화를
                  겪고 있습니다. 이러한 변화 가운데 우수한 잠재력을 가진
                  학생들이 활약하고 성장할 수 있는 기회의 장을 대학에서 어떻게
                  만들어낼 수 있을지 끊임없이 고민을 해왔습니다. KUBIG 은 다양한
                  주제의 스터디, 프로젝트, 대회 참여 및 연구 활동을 통해
                  구성원들의 도약을 이끌어낼 수 있는 학회입니다.
                </p>
                <br />
                <p>
                  미래의 변화를 주도할 연구자, 공학자, 경영자로 성장하고 싶은
                  고려대학교 학우 분들은 KUBIG 을 통해 저와 함께 길을 찾을 수
                  있기를 바랍니다.
                </p>
                <br />
              </TextBox>
            </TextContainer>

            <TextContainer>
              <Line />

              <TextBox className="experience">
                <ul>
                  <li>
                    Korea University, Department of Statistics, Assistant
                    Professor (2023.03 — )
                  </li>
                  <li>
                    {" "}
                    UNIST AI Graduate School & Department of Industrial
                    Engineering, Assistant Professor (2020.01 — 2023.03){" "}
                  </li>
                  <li>Kakao Brain, AI Scientist (2018.01 — 2019.12)</li>
                  <li>DeepBio, Research Engineer (2017.02 — 2017.07)</li>
                  <li>삼성화재, 선임 (2016.03 — 2017.01)</li>
                  <li>Korea University, Ph.D. in Mathematics (2016.02)</li>
                </ul>
              </TextBox>
            </TextContainer>
          </ContentContainer>
        </Wrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  ///margin: 4rem 15vw 3rem 15vw;
  width: 100%;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 4rem;
  min-width: 1080px;

  .outer {
    width: auto;
    justify-content: center;
  }
  .inner {
    width: 80%;
    justify-items: center;
    //justify-content: space-between;
    grid-gap: 10rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const ImageContainer = styled.div`
  img {
    position: relative;
    top: -7rem;
    width: 22.625rem;
    height: 24.9375rem;
    flex-shrink: 0;
    margin-bottom: 0.5rem;
  }
`;

const Name = styled.div`
  display: flex;
  column-gap: 0.8rem;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -6rem;

  p {
    color: #000;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 180%; /* 2.7rem */
  }

  .name {
    /* font-family: Noto Sans; */
    font-size: 2rem;
    font-weight: 700;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 2rem;
  padding-bottom: 4vh;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  font-style: normal;
  margin-bottom: 2rem;

  .head {
    font-size: 3rem;
    font-weight: 300;
    line-height: 150%; /* 3rem */
    margin-bottom: -2rem;

    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  }
  p {
    font-size: 16px; //1.5rem;
    font-weight: 400;
    line-height: 100%; /* 2.7rem */
  }
  p b {
    font-weight: 700;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 5rem;
  padding-top: 3rem;
  margin-bottom: 2rem;
`;

const Line = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 5.4375rem;
  height: 0.3125rem;
  flex-shrink: 0;
  background: #9e1f15;
  margin-top: 1.5rem;
`;

const TextBox = styled.div`
  width: 50.625rem;
  height: 14.4375rem;
  flex-shrink: 0;
  line-height: 190%;

  color: #000;
  font-style: normal;
  font-weight: 400;
  margin-top: 1rem;
  margin-bottom: 1rem;
  line-height: 180%; /* 2.025rem */

  ul {
    font-size: 1rem;
    list-style-type: disc;
  }
  li {
    margin-left: -2rem;
  }
  p {
    margin-top: 0.5rem;
    font-size: 1.125rem;
  }
`;
