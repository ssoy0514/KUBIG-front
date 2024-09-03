import { css, styled } from "styled-components";
import {
  GrayLine,
  RecruitingItemWrapper,
  RecruitingTextContainer,
} from "../FAQ/QuestionItem";
export default function NoticeItem({ notice, last, idx, page }) {
  const date = notice.createdAt.slice(0, 10);
  const index = page === 0 ? "FIXED" : (page - 1) * 4 + idx + 1;
  let deadline = "";
  if (notice.deadline !== undefined) {
    if (notice.deadline === "over") deadline = "마감";
    else if (notice.deadline === "regular") deadline = "상시모집";
    else {
      deadline = "공고 중";
    }
  }
  return (
    <>
      <GrayLine />
      <RecruitingItemWrapper>
        <RecruitingTextContainer>
          <h2>{index}</h2>
          {notice.deadline !== undefined && (
            <DeadLineContainer>
              <DeadLine deadline={notice.deadline}>{deadline}</DeadLine>
            </DeadLineContainer>
          )}
          <h3>{notice.title}</h3>

          {notice.tags !== undefined && (
            <ul>
              {notice.tags.map((str, index) => (
                <li
                  key={index}
                  style={{
                    float: "left",
                    color: " #979797",
                    fontWeight: "600",
                    marginRight: "0.8rem",
                    fontSize: "0.9rem",
                  }}
                >
                  #{str}
                </li>
              ))}
            </ul>
          )}
        </RecruitingTextContainer>

        <FileWrapper>
          <FileInfo>
            <h5>{`${notice.author.generation}기 ${notice.author.name}`}</h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="16"
              viewBox="0 0 2 16"
              fill="none"
            >
              <path
                d="M1 1.25V14.75"
                stroke="#D6D8DB"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h5>{date}</h5>
          </FileInfo>
        </FileWrapper>
      </RecruitingItemWrapper>

      {last && <GrayLine />}
    </>
  );
}
const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;
const FileInfo = styled.div`
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  width: 11rem;
  display: flex;
  align-items: center;

  border-radius: 1.875rem;
  border: 1px solid #d6d8db;
  background: #f9fafc;
  h5 {
    text-align: center;
    color: #979797;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
  }
  svg {
    margin-left: 0.44rem;
    margin-right: 0.44rem;
  }
`;
const FileDownload = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  img {
    width: 0.75rem;
    height: 0.75rem;
  }
  h5 {
    color: #9e1f15;
    text-align: center;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 600;
  }
`;

export const DeadLineContainer = styled.div`
  width: 4.25rem;
  height: 1.75rem;
  display: flex;
  justify-content: center;
  margin-left: 1.5rem;
`;
export const DeadLine = styled.div`
  border-radius: 1.875rem;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 180%;
  ${(props) => {
    if (props.deadline === "over") {
      return css`
        border: 1px solid #eb443b;
        background: rgba(235, 68, 59, 0.2);
        color: #eb443b;
      `;
    } else if (props.deadline === "regular") {
      return css`
        color: #5db63a;

        border: 1px solid #5db63a;
        background: rgba(93, 182, 58, 0.2);
      `;
    } else {
      return css`
        color: #eeac46;

        border: 1px solid #eeac46;
        background: rgba(238, 172, 70, 0.2);
      `;
    }
  }}
  /* border: 1px solid #5db63a; */
  /* background: rgba(93, 182, 58, 0.2); */
  display: inline-flex;
  padding: 0.1875rem 0.8125rem;
  align-items: center;
  gap: 0.4375rem;
  white-space: nowrap;
`;
