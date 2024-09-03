import { styled } from "styled-components";
import { AddButton as Button } from "../../common/AddButton";
import { useState } from "react";
import NoticeInput from "./NoticeInput";
import client from "../../../lib/httpClient";
export default function NoticeDetailItem({ notice, mode, isAdmin }) {
  const [edit, setEdit] = useState(false);
  const deleteNoticeHandler = async () => {
    try {
      let deleteCheck = window.confirm("정말 삭제 하시겠습니까?");
      if (deleteCheck) {
        let url = "/recruiting/notice/";
        let redirectUrl = "/recruiting/notice/";
        if (mode === 1) {
          url = "/for-kubig/notice/";
          redirectUrl = "/for-kubig/notice/";
        } else if (mode === 2) {
          url = "/for-kubig/intern-notice/";
          redirectUrl = "/for-kubig/intern-notice/";
        }
        const res = await client.delete(`${url}` + notice.id);
        window.location.href = redirectUrl;
      }
    } catch (err) {
      alert(err);
    }
  };
  let deadline = "";
  let tags = [];
  if (notice.deadline !== undefined) {
    deadline = notice.deadline;
    tags = notice.tags;
  }
  return (
    <Wrapper>
      {!edit && (
        <ArticleWrapper>
          {isAdmin && (
            <>
              {" "}
              <Button
                style={{ marginRight: "0.75rem" }}
                onClick={() => setEdit(true)}
              >
                수정
              </Button>
              <Button onClick={deleteNoticeHandler}>삭제</Button>
            </>
          )}

          <HeaderWrapper>
            <Title>{notice.title}</Title>
            <Info>
              <h4 style={{ color: "#9FA0A7" }}>
                by.{" "}
                {notice.author
                  ? notice.author.generation + "기 " + notice.author.name
                  : "fetching"}{" "}
                {notice.createdAt
                  ? notice.createdAt.substring(0, 10)
                  : "fetching"}
              </h4>
            </Info>
          </HeaderWrapper>
          <article>
            <div
              style={({ overflow: "scroll" }, { padding: "5px" })}
              dangerouslySetInnerHTML={{ __html: notice.content }}
            />
          </article>
        </ArticleWrapper>
      )}
      {edit && (
        <>
          <ArticleWrapper>
            <Button
              style={{ marginRight: "1rem" }}
              onClick={() => setEdit(false)}
            >
              취소
            </Button>
            <Button onClick={deleteNoticeHandler}>삭제</Button>
          </ArticleWrapper>
          <NoticeInput
            existingHtmlStr={notice.content}
            existingTitle={notice.title}
            exisistingDeadline={deadline}
            existingTags={tags}
            id={notice.id}
            mode={mode}
          />
        </>
      )}
    </Wrapper>
  );
}

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #d6d8db;
  margin-top: 2rem;

  h4 {
    font-size: small;
    line-height: 240%;
  }
  margin-bottom: 2.5rem;
`;
const Title = styled.h2``;
const Info = styled.div`
  display: flex;
  gap: 1rem;
`;

const Wrapper = styled.div`
  width: 100%;
  button {
    white-space: nowrap;
  }
`;
const ArticleWrapper = styled.div`
  width: 100%;
  padding-left: 14%;
  padding-right: 14%;
`;
