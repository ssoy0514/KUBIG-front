import { styled } from "styled-components";
import { useEffect, useState } from "react";
import QuillEditor from "./QuillEditor";
import PdfInput from "../../components/Studies/PdfInput";
import TitleAndCategory from "../common/TitleAndCategory";
import { useSearchParams } from "react-router-dom";
import client from "../../lib/httpClient";

export default function StudyEdit() {
  const [htmlStr, setHtmlStr] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);
  const [title, setTitle] = useState("");

  const [semesters, setSemesters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categorySearchParams] = useSearchParams();
  const session = categorySearchParams.get("category");

  const pageIdChange = (e) => {
    setHtmlStr(e.target.value);
  };

  const handleThumbnailChange = (event) => {
    if (event.target.files[0].type.startsWith("image")) {
      setThumbnailImg(event.target.files[0]);
    } else alert("이미지 파일만 등록가능합니다.");
  };
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
          "/studies/category/" + semester + "?session=" + session
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
        htmlStr={htmlStr}
        pdfFile={selectedFile}
        title={title}
        setTitle={setTitle}
        semesters={semesters}
        setSelectedSemester={setSelectedSemester}
        selectedSemester={selectedSemester}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        thumbnailImg={thumbnailImg}
        categories={categories}
        session={session}
      />
      <PdfInput
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        thumbnailImg={thumbnailImg}
        setThumbnailImg={setThumbnailImg}
      />

      {/* <NotionInput
        type="text"
        placeholder={"노션의 페이지 ID를 입력해주세요"}
        value={htmlStr}
        onChange={pageIdChange}
      /> */}
      {/* <EditorWrapper>
        <QuillEditor htmlStr={htmlStr} setHtmlStr={setHtmlStr}></QuillEditor>
      </EditorWrapper> */}
      {/* <PdfInputWrapper style={{ height: "12rem" }}>
        {thumbnailImg ? thumbnailImg.name : "파일을 선택해주세요."}
        <Label for="thumbnail">
          썸네일 이미지 업로드
          <InputFile
            id="thumbnail"
            type="file"
            onChange={handleThumbnailChange}
            accept="image/*"
          />
        </Label>
      </PdfInputWrapper> */}
    </NewWrapper >
  );
}
export const NewWrapper = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-left: 7%;
  padding-right: 7%;
  padding-bottom: 5%;

`;
export const EditorWrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  padding-top: 0.75rem;
`;

const Label = styled.label`
  width: 26.6875rem;
  height: 3.5625rem;
  background: #9e1f15;
  border: 1px solid;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PdfInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  /* border-radius: 0.3125rem; */
  border: 1px solid #d6d8db;
  margin-top: 10px;

  background: #fff;
`;
const InputFile = styled.input`
  display: none;
`;
const NotionInput = styled.input`
  width: 100%;
  padding: 1%;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  border: 1px solid rgb(214, 216, 219);
  border-radius: 5px;
`;
