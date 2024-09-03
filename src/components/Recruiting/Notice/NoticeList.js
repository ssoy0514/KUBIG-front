import { Link } from "react-router-dom";
import NoticeItem from "./NoticeItem";
import { styled } from "styled-components";
import client from "../../../lib/httpClient";

export default function NoticeList({ isAdmin, NOTICE, page, mode }) {
  let url = "/recruiting/notice/fix/";
  let itemUrl = "/recruiting/notice/";
  if (mode === 1) {
    url = "/for-kubig/notice/fix/";
    itemUrl = "/for-kubig/notice/";
  } else if (mode === 2) {
    url = "/for-kubig/intern-notice/fix/";
    itemUrl = "/for-kubig/intern-notice/";
  }
  return (
    <>
      {NOTICE.map((notice, i) => (
        <FixWrapper key={i}>
          {isAdmin && (
            <button
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
          <Link to={`${itemUrl}${notice.id}`}>
            <NoticeItem
              idx={i}
              notice={notice}
              page={page}
              last={i === NOTICE.length - 1 ? true : false}
            />
          </Link>
        </FixWrapper>
      ))}
    </>
  );
}

const FixWrapper = styled.div`
  position: relative;

  button {
    font-size: 0.8rem;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
