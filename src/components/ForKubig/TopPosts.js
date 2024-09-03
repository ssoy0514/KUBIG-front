import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import client from "../../lib/httpClient";
import { Link } from "react-router-dom";
import { DeadLine } from "../Recruiting/Notice/NoticeItem";

const TopPosts = ({ subMenu, isAdmin }) => {
  const [FIXNOTICE, setFIXNOTICE] = useState([]);
  let url = "/for-kubig/notice/fix/";
  let itemUrl = "/for-kubig/notice/";
  if (subMenu === 1) {
    url = "/for-kubig/intern-notice/fix/";
    itemUrl = "/for-kubig/intern-notice/";
  }

  useEffect(() => {
    noticeFixFetch(setFIXNOTICE);
  }, [subMenu]);
  async function noticeFixFetch(setFIXNOTICE) {
    if (subMenu === 0) {
      try {
        const response = await client.get(url);
        const data = response.data;
        setFIXNOTICE(data.noticeList);
      } catch (err) {
        alert("에러가 발생하였습니다.");
      }
    } else {
      try {
        const response = await client.get(url);
        const data = response.data;
        setFIXNOTICE(data.noticeList);
      } catch (err) {
        alert("에러가 발생하였습니다.");
      }
    }
  }
  return (
    <>
      <Wrapper>
        {FIXNOTICE.length === 0 && <h3>고정된 공지가 없습니다.</h3>}
        {FIXNOTICE.map((notice, index) => {
          const contentLength = notice.content.length;
          const contentPreview =
            contentLength >= 30
              ? notice.content.slice(0, 30) + "..."
              : notice.content.slice(0, contentLength) + "...";
          const date = notice.createdAt.slice(0, 10);
          let deadline = "";
          if (notice.deadline !== undefined) {
            if (notice.deadline === "over") deadline = "마감";
            else if (notice.deadline === "regular") deadline = "상시모집";
            else {
              deadline = "공고 중";
            }
          }
          return (
            <FixWrapper>
              <Link to={`${itemUrl}${notice.id}`}>
                <TopItemWrapper key={index}>
                  {notice.deadline !== undefined && (
                    <DeadLine className="deadbox" deadline={notice.deadline}>
                      {deadline}
                    </DeadLine>
                  )}
                  {subMenu === 0 && <h1>[학회 내부 공지]</h1>}
                  {subMenu === 1 && <h1>[외부 인턴 공지]</h1>}
                  <h1>{notice.title}</h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: contentPreview }}
                    className="des"
                  />
                  {subMenu === 1 && notice.tags !== undefined && (
                    <TagWrapper className="hashtag">
                      {notice.tags.map((str, index) => (
                        <p
                          key={index}
                          style={{
                            float: "left",
                          }}
                        >
                          #{str}
                        </p>
                      ))}
                    </TagWrapper>
                  )}

                  <p className="info">
                    {notice.author.name} | {date}
                  </p>
                </TopItemWrapper>
              </Link>
              {isAdmin && (
                <button
                  className="fix"
                  onClick={async () => {
                    try {
                      const res = await client.put(`${url}` + notice.id);
                      window.location.reload();
                    } catch (err) {
                      alert(err);
                    }
                  }}
                >
                  고정
                </button>
              )}
            </FixWrapper>
          );
        })}{" "}
      </Wrapper>
    </>
  );
};

export default TopPosts;

const Wrapper = styled.div`
  display: flex;
  width: auto;
  flex-shrink: 0;
  background: #e5e6e9;
  align-items: center;
  padding-left: 10rem;
  padding-right: 10rem;
  justify-content: space-evenly;
  column-gap: 2rem;
  padding: 2rem;
  min-height: 10rem;
  h3 {
    color: #979797;
  }
`;
const TopItemWrapper = styled.div`
  width: 25.3125rem;
  height: max-content;
  flex-shrink: 0;
  background: #fff;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  h1 {
    color: #000;
    font-size: 1rem;
    font-weight: 700;
    line-height: 180%; /* 1.8rem */
  }
  .des {
    color: #000;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 180%; /* 1.575rem */
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .hashtag {
    p {
      color: #9e1f15;
      font-weight: 600;
      font-size: 0.875rem;
    }
    margin-bottom: 2rem;
  }
  .info {
    color: #979797;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 180%; /* 1.35rem */
  }
`;
const FixWrapper = styled.div`
  position: relative;
  .fix {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .deadbox {
    position: absolute;
    right: 1.5rem;
    top: 3rem;
  }
`;

const TagWrapper = styled.div`
  height: 1rem;
`;
