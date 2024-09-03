import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageBtn from "../common/PageBtn";
import {
  StudyAndProjectWrapper as StudyWrapper,
  ContentContainer as FixedStudyContainer,
  ContentContainer as ProjectContentContainer,
  Content as FixedStudyContent,
  Content as ProjectContent,
  ContentImageContainer,
  HeaderContainer,
} from "../common/StudyAndProject";
import axios from "../../api/axios";
import { EditButton, AddButton } from "../common/AddButton";

export default function StudyList({ session, selectedSemester, selectedCategory }) {
  const pageTitle =
    session === "basic"
      ? "방학 세션 / BASIC"
      : session === "magazine"
        ? "KUBIG MAGAZINE"
        : "학기 중 세션 / Advanced";

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [studies, setStudies] = useState([]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchStudies = async (page, session, semester, category) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
        `/studies/list?` +
        `session=${session}&` +
        `semester=${semester}&` +
        `${category ? `category=${category}&` : ""}page=${page}`
      );
      const data = response.data;
      setTotalPages(data.last_page);
      setStudies(data.studyList);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchStudies(currentPage, session, selectedSemester, selectedCategory);
  }, [currentPage, session, selectedSemester, selectedCategory]);

  // const parser = new DOMParser();

  return (
    <StudyWrapper>
      <HeaderContainer>
        <h1>{pageTitle}</h1>
        <EditButton>
          <Link to={`/studies/new?category=${session}`}>글쓰기</Link>
        </EditButton>
      </HeaderContainer>
      <ProjectContentContainer>
        {studies.length > 0 ? (
          studies.map((study, i) => (
            <Link key={i} to={`/studies/${study.id}`}>
              <ProjectContent key={study.id}>
                <ContentImageContainer>
                  <img src={study.thumbnailUrl} alt="fixed" />
                </ContentImageContainer>
                <h3>{study.title}</h3>
                <h5>{study.createdAt.substring(0, 10)}</h5>
              </ProjectContent>
            </Link>
          ))
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '30em',
          }}>아직 작성된 글이 없습니다.</div>
        )}
        <PageBtn
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </ProjectContentContainer>
    </StudyWrapper>
  );
}
