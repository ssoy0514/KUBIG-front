import { RecruitingHeader, RecruitingWrapper } from "../FAQ/Faq";
import NoticeList from "./NoticeList";
import PageBtn from "../../common/PageBtn";
import { useEffect, useState } from "react";
import { AddButton } from "../../common/AddButton";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import client from "../../../lib/httpClient";
export default function Notice({ mode, isAdmin }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [NOTICE, setNOTICE] = useState([]);
  const [FIXNOTICE, setFIXNOTICE] = useState([]);
  useEffect(() => {
    noticeFetch(currentPage, setNOTICE, setTotalPages);
    if (mode === 0) {
      noticeFixFetch(setFIXNOTICE);
    }
  }, [currentPage]);

  async function noticeFetch(page, setNOTICE, setTotalPages) {
    if (mode === 0) {
      try {
        const response = await axios.get(
          process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
            "/recruiting/notice" +
            `?page=${page}`
        );
        const data = response.data;
        setNOTICE(data.noticeList);
        setTotalPages(data.last_page);
      } catch (err) {
        alert("에러가 발생하였습니다.");
      }
    } else if (mode === 1) {
      try {
        const response = await client.get(
          "/for-kubig/notice" + `?page=${page}`
        );
        const data = response.data;
        setNOTICE(data.noticeList);
        setTotalPages(data.last_page);
      } catch (err) {
        alert("에러가 발생하였습니다.");
      }
    } else {
      try {
        const response = await client.get(
          "/for-kubig/intern-notice" + `?page=${page}`
        );
        const data = response.data;
        setNOTICE(data.noticeList);
        setTotalPages(data.last_page);
      } catch (err) {
        alert("에러가 발생하였습니다.");
      }
    }
  }
  async function noticeFixFetch(setFIXNOTICE) {
    if (mode === 0) {
      try {
        const response = await axios.get(
          process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/recruiting/notice/fix"
        );
        const data = response.data;
        setFIXNOTICE(data.noticeList);
      } catch (err) {
        alert("에러가 발생하였습니다.");
      }
    }
  }
  let newUrl = "/recruiting/notice/new";
  let header = "Recruiting Notice";
  if (mode === 1) {
    newUrl = "/for-kubig/notice/new";
    header = "KUBIG Notice";
  } else if (mode === 2) {
    newUrl = "/for-kubig/intern-notice/new";
    header = "Internship & Project  Notice";
  }
  return (
    <>
      <RecruitingWrapper>
        <RecruitingHeader>
          <h1>{header}</h1>
          {isAdmin && (
            <AddButton>
              <Link to={newUrl}>Add</Link>
            </AddButton>
          )}
        </RecruitingHeader>
        {mode === 0 && <NoticeList NOTICE={FIXNOTICE} page={0} mode={mode} />}
        <NoticeList
          isAdmin={isAdmin}
          NOTICE={NOTICE}
          page={currentPage}
          mode={mode}
        />
        <div style={{ marginTop: "3.75rem" }}>
          <PageBtn
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </RecruitingWrapper>
    </>
  );
}
