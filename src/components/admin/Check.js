import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function Check({ handler }) {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = (password) => {
    axios
      .get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/admin/" + password
      )
      .then((res) => {
        if (res.data.result) {
          handler(true);
        } else {
          setErr(true);
        }
      })
      .catch((err) => {
        alert("관리자 비밀번호가 아닙니다.");
      });
  };

  return (
    <Container>
      <h1>관리자 페이지</h1>
      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          onChange={(e) => {
            setPassword(e.target.value);
            setErr(false);
          }}
        />
        <Button
          w={3}
          h={2}
          style={{ marginLeft: 5, hover: "pointer" }}
          onClick={() => {
            handleCheck(password);
          }}
        >
          확인
        </Button>
      </div>
      {err && <p>관리자 비밀번호가 아닙니다.</p>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30rem;
`;
export default Check;
