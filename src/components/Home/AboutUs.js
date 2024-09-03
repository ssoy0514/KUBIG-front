import { styled } from "styled-components";
import { AboutUsContents } from "./common/Contents";

export default function AboutUs() {
  return (
    <Wrapper>
      <TextContainer>
        <h1>About Us</h1>
        <br />
        <h3>
        <b>KUBIG</b>은 데이터를 통해 세상을 바라보며, Artificial Intelligence를 통해 세계를 바꾸려는 변화의 최전선에 있는 사람들의 모임입니다.
        </h3>
        <br />
      </TextContainer>
      <Line />
      <ContentContainer>
        {AboutUsContents.map((c, i) => (
          <Content key={i}>
            {/* <img src={require("../../image/KUBIG.svg").default} alt="img" /> */}
            <img
              src={process.env.PUBLIC_URL + `/images/${c.imgUrl}`}
              alt="img"
            />

            <DescriptionContainer>
              <h1 style={{ textAlign: "center" }}>{c.title}</h1>
              <h3>{c.description}</h3>
            </DescriptionContainer>
          </Content>
        ))}
      </ContentContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 1000px;
  height: max-content;
`;

const Line = styled.div`
  width: 80%;
  border-top: 1px #bfc1c580 solid;
  margin-top: 2vh;
  margin-bottom: 4rem;
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5%;
  flex-wrap: wrap;
  margin-top: 3vh;
`;
const Content = styled.div`
  width: 23%;
  img {
    width: 100%;
    //height: auto;
    flex-shrink: 0;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 설정 */
  }
`;
const DescriptionContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  h1 {
    text-align: center;
    font-size: 1.375rem;
    margin-bottom: 0.5rem;
  }
  h3 {
    font-size: 1rem;
  }
`;

const TextContainer = styled.div`
  text-align: center;
  h1 {
    color: #020202;
    //text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 설정 */
  }
`;
