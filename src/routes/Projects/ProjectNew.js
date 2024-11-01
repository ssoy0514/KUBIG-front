import { NewWrapper } from "../../components/Studies/StudyEdit";
import styled from "styled-components";
import PdfInput from "../../components/Projects/PdfInput";
import { useEffect, useState } from "react";
import client from "../../lib/httpClient";
import { SelectOption } from "../../components/Projects/ProjectSideBar";
import withAuth from "../../lib/wihAuth";
import { useSearchParams } from "react-router-dom";

function ProjectNew() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);
  const [title, setTitle] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categorySearchParams] = useSearchParams();
  const session = categorySearchParams.get("category");

  const fetchSemester = async () => {
    try {
      const res = await client.get("/studies/semesters");
      if (res) setSemesters(res.data);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    fetchSemester();
  }, []);

  const fetchCategory = async (semester) => {
    try {
      if (semester) {
        const res = await client.get(
          "/project/category/" + semester + "?session=" + session
        );
        if (res) setCategories(res.data);
      }
    } catch (err) {
      alert("올바르지 않은 접근입니다.");
    }
  };
  useEffect(() => {
    fetchCategory(selectedSemester);
  }, [selectedSemester]);
  return (
    <NewWrapper>
      <TitleAndCategory
        pdfFile={selectedFile}
        thumbnailImg={thumbnailImg}
        title={title}
        setTitle={setTitle}
        semesters={semesters}
        setSelectedSemester={setSelectedSemester}
        selectedSemester={selectedSemester}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        session={session}
      />
      <PdfInput
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        thumbnailImg={thumbnailImg}
        setThumbnailImg={setThumbnailImg}
      />
    </NewWrapper>
  );
}

const TitleAndCategory = ({
  pdfFile,
  thumbnailImg,
  title,
  setTitle,
  semesters,
  setSelectedSemester,
  selectedSemester,
  selectedCategory,
  setSelectedCategory,
  categories,
  session,
}) => {
  const tiltleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const selectSemesterChangeHandler = (e) => {
    setSelectedSemester(e.target.value);
  };
  const selectCategoryChangeHandler = (e) => {
    setSelectedCategory(e.target.value);
  };
  const uploadPostHandler = async () => {
    try {
      const pdfFormData = new FormData();
      pdfFormData.append("file", pdfFile);
      
      const pdfResponse = await client.post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/s3",
        pdfFormData
      );
      const pdfUrl = pdfResponse.data;

      const thumbnailFormData = new FormData();
      thumbnailFormData.append("file", thumbnailImg);

      const thumbnailResponse = await client.post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/s3",
        thumbnailFormData
      );
      const thumbnailUrl = thumbnailResponse.data;

      const res = await client.post("/project", {
        title: title,
        category: selectedCategory,
        thumbnail: thumbnailUrl,
        file: pdfUrl,
      });
      console.log(res);
      window.location.href = "/projects?category=" + session;
    } catch (err) {
      alert(err);
    }
  };
  return (
    <InputContainer>
      <InputUpperContainer>
        <Category
          style={{ marginRight: "1rem" }}
          value={selectedSemester}
          onChange={selectSemesterChangeHandler}
          required
        >
          <option value="" disabled selected>
            년도
          </option>
          {semesters.map((s, i) => (
            <option value={s.id} key={i}>
              {s.name}
            </option>
          ))}
        </Category>
        <Category
          value={selectedCategory}
          onChange={selectCategoryChangeHandler}
          required
        >
          <option value="" disabled selected>
            카테고리
          </option>
          {categories.map((s, i) => (
            <option value={s.id} key={i}>
              {s.name}
            </option>
          ))}
        </Category>
        <SubmitBtn
          disabled={
            title === "" ||
            selectedSemester === null ||
            selectedCategory === null ||
            pdfFile === null ||
            thumbnailImg === null
          }
          onClick={uploadPostHandler}
        >
          저장
        </SubmitBtn>
      </InputUpperContainer>
      <Title
        placeholder="제목을 입력하세요"
        value={title}
        onChange={tiltleChangeHandler}
      ></Title>
    </InputContainer>
  );
};
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  background: #fff;
  align-items: center;
`;
const InputUpperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1% 0.8rem 1%;
  border-bottom: 1px solid #d6d8db;
`;

const SubmitBtn = styled.button`
  margin-left: auto;
  border-radius: 5px;
  background: #a8352c;
  padding: 5px 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  &:disabled {
    background-color: #d6d8db;
    color: #f8f9fa;
  }
`;
const Category = styled.select`
  width: 15%;
  height: 2.5rem;
  border-radius: 5px;
  border: 1px solid #d6d8db;
  background: #eff2f3;
  color: #979797;
  font-weight: 500;
`;
const Title = styled.input`
  border: none;
  padding: 1% 0;
  width: 98%;

  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`;
const ThumbnailInput = styled.input``;

export default withAuth(ProjectNew);
