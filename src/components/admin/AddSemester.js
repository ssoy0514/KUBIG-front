import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function AddSemester() {
  const [newGen, setNewGen] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = (gen) => {
    axios
      .post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/studies/semester/" + gen
      )
      .then((res) => {
        setErr(true);
        setNewGen("");
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
      });
  };

  return (
    <Container>
      <h5>학기 추가</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
        스터디, 컨퍼런스 페이지에 표시될 학기를 추가합니다.
      </p>
      <div style={{ display: "flex", marginTop: 5 }}>
        <input
          style={{ width: "200px" }}
          placeholder="추가할 학기 명 (2023-1, 2024-2 ..)"
          onChange={(e) => {
            setNewGen(e.target.value);
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
  margin-bottom: 4rem;
  justify-content: center;
  width: 100%;
  height: 5rem;
`;

export default AddSemester;
