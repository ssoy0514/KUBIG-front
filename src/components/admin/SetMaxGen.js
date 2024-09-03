import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function SetMaxGen() {
  const [newGen, setNewGen] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = (gen) => {
    axios
      .post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/generation/" + gen
      )
      .then((res) => {
        setErr(true);
      })
      .catch((err) => {
        alert("오류가 발생했습니다.");
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
        기본 정보
      </h3>
      <h5>활동 기수 수정</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
        현재 활동 기수를 변경합니다. (member, administrator 페이지에 표시됨)
      </p>
      <div style={{ display: "flex", marginTop: 5 }}>
        <input
          style={{ width: "200px" }}
          placeholder="현재 기수를 입력하세요. (18, 19..)"
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
          확인
        </Button>{" "}
      </div>
      {err && <p>변경 완료되었습니다.</p>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  justify-content: center;
  width: 100%;
  height: 6rem;
`;

export default SetMaxGen;
