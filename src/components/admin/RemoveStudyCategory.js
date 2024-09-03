import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function RemoveStudyCategory() {
  const [newGen, setNewGen] = useState("");
  const [session, setSession] = useState("basic");
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = () => {
    console.log(name, newGen, session);
    axios
      .post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/studies/delete/category",
        {
          name: name,
          semesterName: newGen,
          sessionType: session,
        }
      )
      .then((res) => {
        setErr(true);
        setNewGen("");
      })
      .catch((err) => {
        alert("학기 명을 정확히 입력해주세요.");
      });
  };

  return (
    <Container>
      <h5>스터디 카테고리 삭제</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
        스터디 페이지에 카테고리를 삭제합니다.(스터디 글이 작성되지 않은
        카테고리만 삭제가능합니다.) <br />
        ex) 2023-1 / advanced / 논문리뷰스터디
      </p>
      <div style={{ display: "flex", marginTop: 5 }}>
        <input
          style={{ width: "200px", marginLeft: 5 }}
          placeholder="속하는 학기 이름(정확히 입력)"
          onChange={(e) => {
            setNewGen(e.target.value);
            setErr(false);
          }}
        />
        <select
          style={{ width: "200px", marginLeft: 5 }}
          onChange={(e) => {
            setSession(e.target.value);
            setErr(false);
          }}
        >
          <option default value="basic">
            basic
          </option>
          <option value="advance">advance</option>
          <option value="magazine">magazine</option>
        </select>
        <input
          style={{ width: "200px", marginLeft: 5 }}
          placeholder="삭제할 카테고리 명"
          onChange={(e) => {
            setName(e.target.value);
            setErr(false);
          }}
        />
        <Button
          w={3}
          h={2}
          style={{ marginLeft: 5, hover: "pointer" }}
          onClick={() => {
            handleCheck(newGen);
          }}
        >
          삭제
        </Button>
      </div>
      {err && <p>삭제 완료되었습니다.</p>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  //align-items: center;
  justify-content: center;
  width: 100%;
  height: 7rem;
`;

export default RemoveStudyCategory;
