import { styled } from "styled-components";
import { ActivitiesContents } from "./common/Contents";

export default function Activities() {
  return (
    <Wrapper>
      <TextContainer>
        <h1>Activities</h1>
        <br />
        <h3>
          <strong>KUBIG</strong>은 구성원의 커리어 성장을 촉진하기 위해 다양한
          분야를 경험할 수 있는 기회를 제공하고 있습니다
        </h3>
      </TextContainer>

      <ContentContainer>
        {ActivitiesContents.map((c, i) => (
          <Content key={i}>
            <img
              src={process.env.PUBLIC_URL + `/images/${c.imgUrl}`}
              alt="img"
            />
            <DescriptionContainer>
              <h2>{c.title}</h2>
              <h4>{c.description}</h4>
            </DescriptionContainer>
          </Content>
        ))}
      </ContentContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  //padding-top: 5rem;
  padding-bottom: 10rem;
  min-height: 70rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 1080px;
  height: max-content;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(2rem, 15%, 9rem);
  margin-top: 8rem;
  flex-wrap: wrap;
`;

const Content = styled.div`
  width: 27%;
  h2 {
    text-align: center;
  }
  img {
    width: 100%;
    //height: auto;
    //height: 15.25rem;
    //flex-shrink: 0;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 설정 */
  }
`;
const DescriptionContainer = styled.div`
  margin-top: 1vh;

  width: 100%;
  h2 {
    margin-bottom: 1rem;
  }
`;
const TextContainer = styled.div`
  text-align: center;
`;
