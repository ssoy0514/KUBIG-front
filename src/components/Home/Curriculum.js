import { css, styled } from "styled-components";
import { CurriculumContents } from "./common/Contents";
export default function Curriculum() {
  return (
    <Wrapper>
      <TextContainer>
        <h1>Curriculum</h1>
        <br />
        <h3>
          기초부터 실전까지의 체계적인 커리큘럼을 통하여 <strong>KUBIG</strong>{" "}
          구성원 모두가 상호 협력을 통한 성장을 경험하게 됩니다
        </h3>
      </TextContainer>
      <ContentContainer>
        {CurriculumContents.map((c, i) => {
          if (i % 2 === 0) {
            return (
              <Content key={i}>
                <ImageContainer style={{ marginLeft: "10vw" }}>
                  <img
                    src={process.env.PUBLIC_URL + `/images/${c.imgUrl}`}
                    alt="img"
                  />
                </ImageContainer>
                <CurContainer>
                  <RedContainer i={i}>
                    <RedCircle />
                    <h4 style={{ color: "#9e1f15" }}>{c.semester}</h4>
                  </RedContainer>
                  <RedContainer i={i}>
                    <RL h={14} i={i} />
                  </RedContainer>
                  <RedContainer i={i}>
                    <RedCircle />
                    <h2>{c.session}</h2>
                  </RedContainer>
                  <RedContainer i={i} style={{ alignItems: "start" }}>
                    <RL h={155} i={i} />
                    <h4>{c.sessionDescription}</h4>
                  </RedContainer>
                  <RedContainer i={i}>
                    <RedCircle />
                    <h2>{c.project}</h2>
                  </RedContainer>
                  <RedContainer i={i}>
                    <RL h={108} i={i} />
                    <h4>{c.projectDescription}</h4>
                  </RedContainer>
                </CurContainer>
              </Content>
            );
          } else {
            return (
              <Content key={i} style={{ justifyContent: "flex-end" }}>
                <CurContainer>
                  <RedContainer i={i}>
                    <h4 style={{ color: "#9e1f15" }}>{c.semester}</h4>
                    <RedCircle />
                  </RedContainer>
                  <RedContainer i={i}>
                    <RL h={14} i={i} />
                  </RedContainer>
                  <RedContainer i={i}>
                    <h2>{c.session}</h2>
                    <RedCircle />
                  </RedContainer>
                  <RedContainer style={{ alignItems: "start" }}>
                    <h4>{c.sessionDescription}</h4>
                    <RL h={155} i={i} />
                  </RedContainer>
                  <RedContainer i={i}>
                    <h2>{c.project}</h2>
                    <RedCircle />
                  </RedContainer>
                  <RedContainer i={i}>
                    <h4>{c.projectDescription}</h4>
                    <RL h={108} i={i} />
                  </RedContainer>
                </CurContainer>

                <ImageContainer style={{ marginRight: "10vw" }}>
                  <img
                    src={process.env.PUBLIC_URL + `/images/${c.imgUrl}`}
                    alt="img"
                    style={{ objectFit: "cover" }}
                  />
                </ImageContainer>
              </Content>
            );
          }
        })}
      </ContentContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background: #f9fafc;
  padding-top: 5rem;
  padding-bottom: 2.5rem;
  //min-height: clamp(85rem, 140vh, 100rem);
  justify-content: center;
  min-width: 1000px;
  height: max-content;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(2rem, 13vh, 5rem);
  padding: 5vh 0 5vw 5vw;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 1.4rem;
  align-items: center;
`;
const ImageContainer = styled.div`
  width: 45%;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    lightgray 50% / cover no-repeat, rgba(217, 217, 217, 0.5);

  img {
    border-radius: 6px;
    object-fit: cover;
    width: 100%;
    height: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 설정 */
  }
`;

const CurContainer = styled.div`
  /* position: absolute; */
  /* width: 100%; */

  h4 {
    max-width: 331px;
  }
`;

const RedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  ${(props) =>
    props.i % 2 === 0
      ? css``
      : css`
          justify-content: flex-end;
        `}
  h3 {
    ${(props) =>
      props.i % 2 === 0
        ? css``
        : css`
            text-align: right;
          `}
  }
`;
export const RedCircle = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2px solid #ECD2D0;
  background-color: #9f1f14;
`;

const RL = styled.div`
  border-left: 2px #9f1f1480  solid;
  height: ${(props) => props.h + "px"};
  ${(props) =>
    props.i % 2 === 0
      ? css`
          margin-left: 7px;
        `
      : css`
          margin-right: 7px;
        `}
`;
const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;
