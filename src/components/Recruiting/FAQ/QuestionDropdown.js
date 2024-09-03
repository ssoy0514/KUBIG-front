import { styled } from "styled-components";

export default function QuestionDropdown({ answer }) {
  return (
    <Wrapper>
      {answer.split("\r\n").map((item, i) => (
        <div key={i}>
          <p>{item}</p>
          <br />
        </div>
      ))}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background: #f3f3f3;
  width: 100%;

  p {
    padding-left: 4vw;
    font-size: 1rem;
  }
  padding-top: 2rem;
`;
