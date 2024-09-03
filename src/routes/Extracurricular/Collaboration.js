import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import Banner from "../../components/Extracurricular/ExtraBanner";
import SpecialLecItem from "../../components/Extracurricular/SpecialLecItem";
import { CurrFetch } from "./CurrFetch";
import PageBtn from "../../components/common/PageBtn";
import AuthContext from "../../components/Auth/AuthContext";

export default function Collaboration() {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.role === "admin" ? true : false;
  const [CURR, setCURR] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    CurrFetch(currentPage, "collaboration", setCURR, setTotalPages);
  }, [currentPage]);
  return (
    <>
      <Banner isAdmin={isAdmin} id={2} />
      <Wrapper>
        {CURR.map((item, i) => (
          <SpecialLecItem key={i} isAdmin={isAdmin} item={item} />
        ))}
        <PageBtn
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7rem 13% 15rem 13%;
  row-gap:2rem;
`;
