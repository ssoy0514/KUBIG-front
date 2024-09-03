import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function UpdateAdminPw() {
  const [newPwd, setNewPwd] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = (password) => {
    axios
      .post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/admin/" + password
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
          marginBottom: 10,
        }}
      >
        Admin
        <br />
      </h3>
      <h5>Admin 페이지 비밀번호 변경</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
        어드민 페이지 접속시 사용되는 비밀번호를 변경합니다.
      </p>
      <div
        style={{
          display: "flex",
          marginTop: 5,
          marginRight: "auto",
        }}
      >
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          style={{ width: "200px" }}
          onChange={(e) => {
            setNewPwd(e.target.value);
            setErr(false);
          }}
        />
        <Button
          w={3}
          h={2}
          style={{ marginLeft: 5, hover: "pointer" }}
          onClick={() => {
            handleCheck(newPwd);
          }}
        >
          확인
        </Button>
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
  height: 8rem;
`;

export default UpdateAdminPw;
