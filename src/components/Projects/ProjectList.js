import PageBtn from "../common/PageBtn";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  StudyAndProjectWrapper as ProjectWrapper,
  ContentContainer as ProjectContentContainer,
  Content as ProjectContent,
  ContentImageContainer,
  HeaderContainer,
} from "../common/StudyAndProject";
import { EditButton, AddButton } from "../common/AddButton";
import axios from "../../api/axios";

export default function ProjectList({ session, selectedSemester, selectedCategory }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [projects, setProjects] = useState([]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchProjects = async (page, session, semester, category) => {
    const res = await axios.get(
      process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
      `/project/list?` +
      `session=${session}&` +
      `semester=${semester}&` +
      `${category ? `category=${category}&` : ""}page=${page}`
    );
    const { data } = res;
    setTotalPages(data.last_page);
    setProjects(data.projectList);
  };
  useEffect(() => {
    fetchProjects(currentPage, session, selectedSemester, selectedCategory);
  }, [currentPage, session, selectedSemester, selectedCategory]);

  return (
    <ProjectWrapper>
      <HeaderContainer>
        <h1>KUBIG {session.toUpperCase()}</h1>
        <EditButton>
          <Link to={`/projects/new?category=${session}`}>글쓰기</Link>
        </EditButton>
      </HeaderContainer>
      <ProjectContentContainer>
        {projects.length > 0 ? (
          projects.map((study, i) => (
            <Link key={i} to={`/projects/${study.id}`}>
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
    </ProjectWrapper>
  );
}
