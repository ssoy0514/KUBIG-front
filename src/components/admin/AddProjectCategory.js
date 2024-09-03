import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function AddProjectCategory() {
  const [newGen, setNewGen] = useState("");
  const [session, setSession] = useState("conference");
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = () => {
    console.log(name, newGen, session);
    axios
      .post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/project/add/category",
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
      <h3
        style={{
          color: "darkred",
          fontSize: "medium",
          fontWeight: "bold",
          marginTop: 35,
          marginBottom: 10,
        }}
      >
        Project
        <br />
      </h3>
      <h5>프로젝트 카테고리 추가</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
        프로젝트 페이지에 카테고리를 추가합니다. <br />
        ex) 2023-1 / conference / NLP
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
          <option default value="conference">
            conference
          </option>
          <option value="contest">contest</option>
        </select>
        <input
          style={{ width: "200px", marginLeft: 5 }}
          placeholder="추가할 카테고리 명"
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
          추가
        </Button>
      </div>

      {err && <p>추가 완료되었습니다.</p>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  justify-content: center;
  width: 100%;
  height: 7rem;
`;

export default AddProjectCategory;
