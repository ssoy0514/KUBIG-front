import { useState } from "react";
import { styled } from "styled-components";
import QuestionDropdown from "./QuestionDropdown";
import DropDownArrow from "../../../image/IcArrow.png";
import { AddButton } from "../../common/AddButton";
import client from "../../../lib/httpClient";
export default function QuestionItem({ faq, last, isAdmin }) {
  const [dropdown, setDropdown] = useState(false);
  const deleteFaqHandler = async () => {
    try {
      let url = "/recruiting/faq/";
      let redirectUrl = "/recruiting/faq/";
      let deleteCheck = window.confirm("정말 삭제 하시겠습니까?");
      if (deleteCheck) {
        await client.delete(`${url}` + faq.id);
        window.location.href = redirectUrl;
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <GrayLine />

      <RecruitingItemWrapper onClick={() => setDropdown((prev) => !prev)}>
        <RecruitingTextContainer>
          <h2>Q</h2>
          <h3>{faq.question}</h3>
        </RecruitingTextContainer>
        {isAdmin && (
          <AddButton
            style={{ whiteSpace: "nowrap", marginLeft: "1rem" }}
            onClick={deleteFaqHandler}
          >
            삭제
          </AddButton>
        )}
        <DropdownBtn>
          <Arrow src={DropDownArrow} $dropdown={dropdown ? "selected" : ""} />
        </DropdownBtn>
      </RecruitingItemWrapper>
      {last && <GrayLine />}
      {dropdown && <QuestionDropdown answer={faq.answer} />}
    </>
  );
}
export const RecruitingItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;

  &:hover {
    background-color: #f3f3f3;
    transition: all 0.2s;
  }
`;
export const GrayLine = styled.div`
  width: 100%;
  /* min-width: 1340px; */
  height: 1px;
  background-color: #d9d9d9;
`;
export const RecruitingTextContainer = styled.div`
  display: flex;
  align-items: center;
  h2 {
    color: #9e1f15;
  }
  h3 {
    font-weight: 700;
    margin-left: 3.8rem;
  }
`;
const DropdownBtn = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  background: #f9fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;
const Arrow = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  transform: ${(props) =>
    props.$dropdown === "selected" ? "rotate(180deg);" : ""};
`;
