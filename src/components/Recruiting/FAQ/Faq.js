import { styled } from "styled-components";
import QuestionList from "./QuestionList";
import { AddButton } from "../../common/AddButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function Faq({ isAdmin }) {
  const [QUESTIONS, setQUESTIONS] = useState([]);
  useEffect(() => {
    faqFetch();
  }, []);
  async function faqFetch() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/recruiting/faq"
      );
      const data = response.data;
      setQUESTIONS(data);
    } catch (err) {
      alert("에러가 발생하였습니다.");
    }
  }
  return (
    <>
      <RecruitingWrapper>
        <RecruitingHeader>
          <h1>Frequently Asked Question</h1>
          {isAdmin && (
            <AddButton>
              <Link to="/recruiting/faq/new">Add</Link>
            </AddButton>
          )}
        </RecruitingHeader>
        <QuestionList isAdmin={isAdmin} QUESTIONS={QUESTIONS} />
      </RecruitingWrapper>
    </>
  );
}

export const RecruitingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 14%;
  padding-right: 14%;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;
export const RecruitingHeader = styled.div`
  h1 {
    color: #9e1f15;
    font-size: 2rem;
  }
  button {
    margin-left: auto;
    height: 2.5rem;
  }
  display: flex;
  align-items: center;
  margin-bottom: 1.44rem;
`;
