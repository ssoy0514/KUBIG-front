import { Link, useSubmit } from "react-router-dom";
import { styled } from "styled-components";
import { ItemWrapper as StudyItemWrapper } from "../common/StudyAndProject";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../Auth/AuthContext";
import client from "../../lib/httpClient";
import PdfViewer from "./PdfViewer";

import ReactNotion from "./ReactNotion";

export default function StudyItem({ study }) {

  const handleDelete = async () => {
    try {
      await client.get("/studies/delete/" + study.id);
      window.location.href =
        "/studies?difficulty=" + study.category.sessionType;
    } catch (err) {
      alert(err.data.message);
    }
  };

  const authContext = useContext(AuthContext);

  return (
    study &&
    study.category && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <StudyItemWrapper>
          <HeaderWrapper>
            <Title>{study.title}</Title>
            <StudyInfo>
              <h4 style={{ color: "#9E1F15" }}>
                {study.category.sessionType === "basic"
                  ? "Basic"
                  : study.category.sessionType === "magazine"
                    ? "Magazine"
                    : "Advanced"}
                /{study.category ? study.category.name : "fetching"}
              </h4>
              <h4 style={{ color: "#9FA0A7" }}>
                by.{" "}
                {study.author
                  ? study.author.generation + "기 " + study.author.name
                  : "fetching"}
                {study.createdAt
                  ? study.createdAt.substring(0, 10)
                  : "fetching"}
              </h4>
              <menu
                style={{
                  display:
                    (authContext.name &&
                      (authContext.name === study.author.name ||
                        authContext.name === "임성빈")) ||
                      authContext.role === "admin"
                      ? "flex"
                      : "none",
                  gap: 10,
                  margin: "0px 5px 5px auto",
                }}
              >
                <EditButtonWrapper>
                  <Link to="edit">
                    Edit
                  </Link>
                </EditButtonWrapper>
                <DelButtonWrapper
                  onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm("삭제하시겠습니까?")) {
                      handleDelete();
                    }
                  }}
                >
                  Delete
                </DelButtonWrapper>
              </menu>
            </StudyInfo>
          </HeaderWrapper>

          {study.content ? (
            <PdfViewer fileUrl={study.content} />
          ) : (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '30em',
            }}>아직 작성된 내용이 없습니다.</div>
          )}

          {/* <DocWrapper> */}
            {/* {study.content ? (
              <ReactNotion pageId={study.content} />
            ) : (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '30em',
              }}>아직 작성된 내용이 없습니다.</div>
            )} */}
            {/* {study.content && <div style={{ width: "85%", padding: "2rem" }} dangerouslySetInnerHTML={{ __html: study.content }} />} */}
            {/* {study.fileUrl != "default_url" && <PdfViewer fileUrl={study.fileUrl} />} */}
          {/* </DocWrapper> */}
        </StudyItemWrapper>
      </div>
    )
  );
}

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #d6d8db;
  margin-right: 8.5vw;
  margin-bottom: 2.5rem;
  h4 {
    font-size: small;
    line-height: 200%;
  }
`;
const Title = styled.h2``;
const StudyInfo = styled.div`
  display: flex;
  gap: 1rem;
`;
const EditButtonWrapper = styled.div`
  width: 3.5rem;
  height: 2rem;
  background-color: rgb(242, 242, 242);
  color: rgb(64, 75, 82);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;

  cursor: pointer;
  
  &:hover {
    background-color: rgb(229, 229, 229);  // hover 상태에서의 배경색
  }
`;
const DelButtonWrapper = styled.div`
  width: 3.5rem;
  height: 2rem;
  background-color: #9e1f15;
  color: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;

  cursor: pointer;
`;
const DocWrapper = styled.div`
  margin-right: 8.5vw;

  * {
    line-height: 100%
  }
  div.notion-title {
    font-size: 2em;
  }
  header.notion-page-header {
    display: none;
  }
  main.notion-page-offset {
    margin-top: 50px
  }
  p.notion-text {
    line-height: 1.5;
  }
  blockquote.notion-quote {
    font-size: 1em;
    line-height: 1.5;
  }
  li {
    line-height: normal;
  }
  .notion-row * {
    line-height: normal;
  }
  .katex-html {
    line-height: 1.5;
  }
  span.katex-display {
    overflow-x: auto;
    overflow-y: hidden;
  }
`;