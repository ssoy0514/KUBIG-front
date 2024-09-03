import Banner from "../../components/Extracurricular/ExtraBanner";
import CoopItem from "../../components/Extracurricular/CoopItem";
import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import PageBtn from "../../components/common/PageBtn";
import { CurrFetch } from "./CurrFetch";
import AuthContext from "../../components/Auth/AuthContext";

export default function Partnership() {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.role === "admin" ? true : false;
  const [CURR, setCURR] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    CurrFetch(currentPage, "partnership", setCURR, setTotalPages);
  }, [currentPage]);

  return (
    <>
      <Banner isAdmin={isAdmin} id={1} />
      <Wrapper>
        {CURR.map((item, i) => (
          <CoopItem key={i} isAdmin={isAdmin} item={item} />
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
  margin: 7rem 13% 20rem 13%;
  row-gap: 2rem;
  //clamp(2rem, 15vw, 20rem) 15rem 15vw
`;
