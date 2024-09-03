import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function AddAdmin() {
  const [newGen, setNewGen] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = (gen) => {
    axios
      .post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/admin/add/" + gen
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
      <h5>관리자 권한 등록</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
        유저에게 사이트의 관리자 권한을 부여합니다. (admin : 게시판 및 산학협력
        등 게시물 게시, 수정 가능) <br /> 운영진이 아닌 학회원도 admin 등록
        가능합니다. <br />
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
  margin-bottom: 4rem;
  justify-content: center;
  width: 100%;
  height: 3rem;
`;

export default AddAdmin;
