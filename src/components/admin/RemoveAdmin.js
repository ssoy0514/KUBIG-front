import { useContext, useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";
import client from "../../lib/httpClient";

function RemoveAdmin() {
  const [newGen, setNewGen] = useState("");
  const [err, setErr] = useState(false);
  const authCtx = useContext(AuthContext);
  const handleCheck = (gen) => {
    axios
      .post(process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/admin/remove/" + gen)
      .then((res) => {
        client.get("/auth/logout").then((res) => {
          localStorage.removeItem("accessToken");

          localStorage.removeItem("refreshToken");
          authCtx.setName("");
          authCtx.setRole("");
        });
        setErr(true);
      })
      .catch((err) => {
        alert("이메일에 일치하는 정보가 없습니다.");
      });
  };

  return (
    <Container>
      <h5>관리자 권한 해제 및 운영진 목록에서 삭제</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
        유저의 admin 권한을 해제합니다. 운영진 유저의 경우, admin 목록과 운영진 목록에서 모두
        삭제됩니다. (게시물 수정 불가, 운영진 구조도에서도 사라짐)
      </p>
      <div style={{ display: "flex", marginTop: 5 }}>
        <input
          style={{ width: "200px" }}
          placeholder="유저 이메일 입력"
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
        </Button>
      </div>
      {err && <p>변경 완료되었습니다.</p>}
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
  height: 4rem;
`;

export default RemoveAdmin;
