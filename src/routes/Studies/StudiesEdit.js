import { useEffect, useState } from "react";
import withAuth from "../../lib/wihAuth";
import { useSearchParams } from "react-router-dom";
import client from "../../lib/httpClient";
// import TitleAndCategory from "../../components/common/TitleAndCategory";
import { styled } from "styled-components";
import QuillEditor from "../../components/Studies/QuillEditor";
import axios from "../../api/axios";

import PdfInput from "../../components/Studies/PdfInput";

function StudiesEdit() {
  const url = window.location.href;

  const trim = window.location.href.substring(0, url.lastIndexOf("/"));
  const id = trim.substring(trim.lastIndexOf("/") + 1);

  // const [htmlStr, setHtmlStr] = useState("");

  const [title, setTitle] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [existingFile, setExistingFile] = useState(null);

  const [session, setSession] = useState(null);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);

  // const pageIdChange = (e) => {
  //   setHtmlStr(e.target.value);
  // };

  // const handleThumbnailChange = (event) => {
  //   if (event.target.files[0].type.startsWith("image")) {
  //     setThumbnailImg(event.target.files[0]);
  //   } else alert("이미지 파일만 등록가능합니다.");
  // };

  const fetch = async () => {
    try {
      const res = await client.get("/studies/info/" + id);
      console.log(res);
      if (res) {
        setExistingFile(res.data.content);
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
      let thumbnailUrl = existingThumbnail;
      let fileUrl = existingFile;

      if (thumbnailImg) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append("file", thumbnailImg);

        const thumbnailResponse = await client.post(
          process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/s3",
          thumbnailFormData
        );
        thumbnailUrl = thumbnailResponse.data;
      }
      
      if (selectedFile) {
        const pdfFormData = new FormData();
        pdfFormData.append("file", selectedFile);

        const pdfResponse = await client.post(
          process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/s3",
          pdfFormData
        );
        fileUrl = pdfResponse.data;
      }

      await client.post("/studies/update/" + id, {
          title: title,
          content: fileUrl,
          categoryId: selectedCategory,
          thumbnailUrl: thumbnailUrl,
      });

      window.location.href = "/studies?difficulty=" + session;

      // if (thumbnailImg) {
      //   const thumbnailFormData = new FormData();
      //   thumbnailFormData.append("file", thumbnailImg);

      //   const thumbnailResponse = await client.post(
      //     process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/s3",
      //     thumbnailFormData
      //   );
      //   const thumbnailUrl = thumbnailResponse.data;

      //   await client.post("/studies/update/" + id, {
      //     title: title,
      //     content: htmlStr,
      //     categoryId: selectedCategory,
      //     thumbnailUrl: thumbnailUrl,
      //   });
      // } else {
      //   await client.post("/studies/update/" + id, {
      //     title: title,
      //     content: htmlStr,
      //     categoryId: selectedCategory,
      //     thumbnailUrl: existingThumbnail,
      //   });
      // }

      // window.location.href = "/studies?difficulty=" + session;
    } catch (err) {
      alert(err);
    }
  };

  return (
    <NewWrapper>
      <TitleAndCategory
        // htmlStr={htmlStr}
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
        update={updatePost}
      />
      <PdfInput
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        thumbnailImg={thumbnailImg}
        setThumbnailImg={setThumbnailImg}
        existingThumbnail={existingThumbnail}
        existingFile={existingFile}
      />

      {/* <PdfInputWrapper style={{ height: "15vh" }}>
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
      /> */}
      {/* <EditorWrapper>
        <QuillEditor htmlStr={htmlStr} setHtmlStr={setHtmlStr}></QuillEditor>
      </EditorWrapper> */}
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
  update,
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

      const res = await client.post("/studies", {
        title: title,
        category: selectedCategory,
        thumbnail: thumbnailUrl,
        content: pdfUrl,
      });
      console.log(res);
      window.location.href = "/studies?category=" + session;
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
            selectedCategory === null
          }
          onClick={update ? update : uploadPostHandler}
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
  background: #9e1f15;
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