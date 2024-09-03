import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function SetAdminRole() {
  const [newGen, setNewGen] = useState("");
  const [role, setRole] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = (gen) => {
    axios
      .post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/admin/set/" + gen,
        { role: role }
      )
      .then((res) => {
        setErr(true);
      })
      .catch((err) => {
        alert("이메일에 일치하는 정보가 없습니다.");
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
        학회원 정보 관리
        <br />
      </h3>
      <h5>운영진등록</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
         사이트 관리자 권한은 부여되지 않습니다.
         운영진 구조도(Administrator 페이지)에 표시됩니다.
        <br /> (학회장 제외 2명 이상일때부터 구조도에 표시됩니다.)
      </p>
      <div style={{ display: "flex" }}>
        <input
          style={{ width: "200px" }}
          placeholder="유저 이메일 입력"
          onChange={(e) => {
            setNewGen(e.target.value);
            setErr(false);
          }}
        />
        <input
          style={{ width: "200px", marginLeft: 5 }}
          placeholder="운영진 역할 입력(학회장 , 기획3팀장, ...)"
          onChange={(e) => {
            setRole(e.target.value);
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
  //align-items: center;
  justify-content: center;
  width: 100%;
  height: 15rem;
`;

export default SetAdminRole;
