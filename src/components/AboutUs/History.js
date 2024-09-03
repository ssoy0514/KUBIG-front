import { css, styled } from "styled-components";

export default function History() {
  return (
    <Wrapper>
      <h1>History</h1>
      <AllHistoryContainer>
        <HistoryContainer>
          <h2>2015</h2>
          <Bar></Bar>
          <DetailContainer>
            <LineContainer>
              <Line h={59} />
              <RedCircle />
            </LineContainer>
            <TextContainer>
              <h3>
                <strong>고려대학교 빅데이터 연구회</strong>
              </h3>
              <h3>
                <strong>KUBIG</strong> 설립
              </h3>
            </TextContainer>
          </DetailContainer>
        </HistoryContainer>

        <HistoryContainer>
          <h2>2019</h2>
          <Bar></Bar>
          <DetailContainer>
            <LineContainer>
              <Line h={130} />
              <RedCircle />
            </LineContainer>
            <TextContainer>
              <h3>Industrial AI 기업</h3>
              <h3>
                <strong>MakinaRocks</strong>와 파트너쉽 체결
              </h3>
            </TextContainer>
          </DetailContainer>
        </HistoryContainer>

        <HistoryContainer>
          <h2>2020</h2>
          <Bar></Bar>
          <DetailContainer>
            <LineContainer>
              <Line h={59} />
              <RedCircle />
            </LineContainer>
            <TextContainer className="text2020">
              <h3>
                <strong>제 1회 KUBIG 데이터 분석 대회 개최</strong>
              </h3>
              <h3>
                코로나 확진자 분석 앱 <strong>코로코로</strong> 개발
              </h3>
            </TextContainer>
          </DetailContainer>
        </HistoryContainer>

        <HistoryContainer>
          <h2>2021</h2>
          <Bar></Bar>
          <DetailContainer>
            <LineContainer>
              <Line h={130} />
              <RedCircle />
            </LineContainer>
            <TextContainer>
              <h3>
                <strong>고려대학교 데이터 사이언스 학회</strong>
              </h3>
              <h3>
                <strong>KUBIG으로</strong> 명칭 변경
              </h3>
            </TextContainer>
          </DetailContainer>
        </HistoryContainer>

        <HistoryContainer>
          <h2>2022</h2>
          <Bar></Bar>
          <DetailContainer>
            <LineContainer>
              <Line h={59} />
              <RedCircle />
            </LineContainer>
            <TextContainer>
              <h3>
                <strong>제 1회 KUBIG Conference 개최</strong>
              </h3>
            </TextContainer>
          </DetailContainer>
        </HistoryContainer>

        <HistoryContainer>
          <h2>2023</h2>
          <Bar></Bar>
          <DetailContainer>
            <LineContainer>
              <Line h={130} />
              <RedCircle />
            </LineContainer>
            <TextContainer>
              <h3>
                <strong>임성빈 지도교수님 선임</strong>
              </h3>
              <h3>
                <strong>고려대학교 데이터 사이언스 & AI 학회</strong>
              </h3>
              <h3>
                <strong>KUBIG으로</strong> 명칭 변경
              </h3>
            </TextContainer>
          </DetailContainer>
        </HistoryContainer>
      </AllHistoryContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  //width: 100%;
  padding-top: 5.5rem;
  padding-bottom: 5.5rem;
  padding-left: 14%;
  padding-right: 14%;
  height: clamp(35rem, 60vh, 50rem);
  justify-content: center;

  
  min-width: 1000px;
  height: max-content;

  h1 {
    color: #9e1f15;
    margin-bottom: 3rem;
  }
  display: flex;
  flex-direction: column;
`;

const AllHistoryContainer = styled.div`
  display: flex;
  width: 100%;
`;
const HistoryContainer = styled.div`
  width: 16.6%; //14.25rem;
  /* width: 100%; */
  display: flex;
  flex-direction: column;

  h3 {
    color: #000;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 180%;

    margin: 0;
  }
`;
const Bar = styled.div`
  background: #9e1f15;
  width: 98%;
  //width: 11.6vw; //clamp(10rem, 12vw,14.0625rem);
  height: 0.5rem;
`;

const DetailContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: flex-end;
`;
const LineContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RedCircle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #9f1f14;
  transform: translate(-50%, 0);
`;

const Line = styled.div`
  border-left: 0.0625rem #9e1f15 solid;
  height: ${(props) => props.h * 0.0625 + "rem"};
  ${(props) =>
    props.i % 2 === 0
      ? css`
          margin-left: 0.5rem;
        `
      : css`
          margin-right: 0.5rem;
        `}
`;

const TextContainer = styled.div`
  margin-left: 0.3rem;
  background-color: #fff;
  z-index: 1;
  //1rem;
  .text2020 {
    background: #ffffff;
  }

  strong {
    color: #000;
    /* title */
    font-size: clamp(0.7rem, 0.83vw, 1rem);
    font-style: normal;
    line-height: 180%;
    font-weight: 700;
  }
  h3 {
    color: #000;
    /* title */
    font-size: clamp(0.7rem, 0.83vw, 1rem);
    font-style: normal;
    line-height: 180%;
    font-weight: 400;
    white-space: nowrap;
  }
`;
