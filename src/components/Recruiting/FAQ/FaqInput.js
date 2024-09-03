import { styled } from "styled-components";

import { useState } from "react";
import { NewWrapper } from "../../Studies/StudyEdit";
import client from "../../../lib/httpClient";
export default function FaqInput() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const questionChangeHandler = (e) => {
    setQuestion(e.target.value);
  };
  const answerChangeHandler = (e) => {
    setAnswer(e.target.value);
  };

  const uploadNoticeHandler = async () => {
    try {
      const res = await client.post("/recruiting/faq", {
        question: question,
        answer: answer,
      });
      //   console.log(res);
      window.location.href = "/recruiting/faq";
    } catch (err) {
      alert(err);
    }
  };
  return (
    <NewWrapper>
      <InputContainer>
        <InputUpperContainer>
          <Title
            placeholder="질문을 입력하세요"
            value={question}
            onChange={questionChangeHandler}
          />
          <SubmitBtn
            disabled={question === "" || answer === ""}
            onClick={uploadNoticeHandler}
          >
            저장
          </SubmitBtn>
        </InputUpperContainer>
        <Content
          placeholder="답변을 입력하세요"
          value={answer}
          onChange={answerChangeHandler}
        />
      </InputContainer>
    </NewWrapper>
  );
}
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  background: #fff;
  align-items: center;
`;
const InputUpperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1% 0.8rem 1%;
  border-bottom: 1px solid #d6d8db;
`;

const SubmitBtn = styled.button`
  margin-left: auto;
  border-radius: 5px;
  background: #9e1f15;
  padding: 5px 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  &:disabled {
    background: gray;
  }
`;
const Title = styled.input`
  border: none;
  padding: 1% 0;
  width: 90%;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`;
const Content = styled.input`
  border: none;
  padding: 1% 0;
  width: 98%;
  height: 30vh;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`;
