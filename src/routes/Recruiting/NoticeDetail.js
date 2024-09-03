import axios from "../../api/axios";
import { useContext, useEffect, useState } from "react";
import NoticeDetailItem from "../../components/Recruiting/Notice/NoticeDetailItem";
import { styled } from "styled-components";
import client from "../../lib/httpClient";
import AuthContext from "../../components/Auth/AuthContext";

export default function NoticeDetail({ mode }) {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.role === "admin" ? true : false;
  const [data, setData] = useState({});
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const id = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );

      if (mode === 0) {
        const response = await axios.get(
          process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
            "/recruiting/notice/" +
            id
        );
        setData(response.data);
      } else if (mode === 1) {
        const response = await client.get("/for-kubig/notice/" + id);
        setData(response.data);
      } else {
        const response = await client.get("/for-kubig/intern-notice/" + id);
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <NoticeDetailItem isAdmin={isAdmin} notice={data} mode={mode} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  margin: 0 auto;
  min-height: 80vh;
  padding-top: 2rem;
`;
