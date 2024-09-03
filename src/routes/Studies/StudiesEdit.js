import { useEffect, useState } from "react";
import withAuth from "../../lib/wihAuth";
import { useSearchParams } from "react-router-dom";
import client from "../../lib/httpClient";
import TitleAndCategory from "../../components/common/TitleAndCategory";
import { styled } from "styled-components";
import QuillEditor from "../../components/Studies/QuillEditor";
import axios from "../../api/axios";
function StudiesEdit() {
  const url = window.location.href;

  const trim = window.location.href.substring(0, url.lastIndexOf("/"));
  const id = trim.substring(trim.lastIndexOf("/") + 1);

  const [htmlStr, setHtmlStr] = useState("");
  const [title, setTitle] = useState("");

  const [semesters, setSemesters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [session, setSession] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState("");

  
  const pageIdChange = (e) => {
    setHtmlStr(e.target.value);
  };

  const handleThumbnailChange = (event) => {
    if (event.target.files[0].type.startsWith("image")) {
      setThumbnailImg(event.target.files[0]);
    } else alert("이미지 파일만 등록가능합니다.");
  };

  const fetch = async () => {
    try {
      const res = await client.get("/studies/info/" + id);
      console.log(res);
      if (res) {
        setHtmlStr(res.data.content);
        setTitle(res.data.title);
        setSelectedSemester(res.data.category.semester.id);
        setSession(res.data.category.sessionType);
        setSelectedCategory(res.data.category.id);
        setExistingThumbnail(res.data.thumbnailUrl);
      }
    } catch (err) {
      alert(err);
    }
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
    fetchSemester().then(() => {
      fetch();
    });
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

  const updatePost = async () => {
    try {
      if (thumbnailImg) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append("file", thumbnailImg);

        const thumbnailResponse = await client.post(
          process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/s3",
          thumbnailFormData
        );

        const thumbnailUrl = thumbnailResponse.data;
        await client.post("/studies/update/" + id, {
          title: title,
          content: htmlStr,
          categoryId: selectedCategory,
          thumbnailUrl: thumbnailUrl,
        });
      } else {
        await client.post("/studies/update/" + id, {
          title: title,
          content: htmlStr,
          categoryId: selectedCategory,
          thumbnailUrl: existingThumbnail,
        });
      }

      window.location.href = "/studies?difficulty=" + session;
    } catch (err) {
      alert(err);
    }
  };

  return (
    <NewWrapper>
      <TitleAndCategory
        htmlStr={htmlStr}
        pdfFile={null}
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
        update={updatePost}
      />
      <PdfInputWrapper style={{ height: "15vh" }}>
        {thumbnailImg ? thumbnailImg.name : existingThumbnail}
        <Label for="thumbnail">
          썸네일 이미지 업로드
          <InputFile
            id="thumbnail"
            type="file"
            onChange={handleThumbnailChange}
            accept="image/*"
          />
        </Label>
      </PdfInputWrapper>
      
      <NotionInput
        type="text"
        placeholder={"노션의 페이지 ID를 입력해주세요"}
        value={htmlStr}
        onChange={pageIdChange}
      />
      {/* <EditorWrapper>
        <QuillEditor htmlStr={htmlStr} setHtmlStr={setHtmlStr}></QuillEditor>
      </EditorWrapper> */}
    </NewWrapper>
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
const InputFile = styled.input`
  display: none;
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
const NotionInput = styled.input`
  width: 100%;
  padding: 1%;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  border: 1px solid rgb(214, 216, 219);
  border-radius: 5px;
`;

export default withAuth(StudiesEdit);