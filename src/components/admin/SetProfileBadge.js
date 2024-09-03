import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function SetProfileBadge() {
  const [newGen, setNewGen] = useState("");
  const [role, setRole] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = (gen) => {
    axios
      .post(process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/badge/" + gen, {
        badge: role,
      })
      .then((res) => {
        setErr(true);
      })
      .catch((err) => {
        alert("이메일에 일치하는 정보가 없습니다.");
      });
  };

  return (
    <Container>
      <h5> 프로필 뱃지 추가 </h5>

      <p style={{ color: "gray", fontSize: "small" }}>
        members 페이지 프로필 사진 위에 표시할 뱃지 추가 (18th president
        ,지도교수 ..) <br />
        삭제하려면 빈칸 입력 후 저장
      </p>

      <div style={{ display: "flex" }}>
        <input
          style={{ width: "200px", marginRight: 5 }}
          placeholder="유저 이메일 입력"
          onChange={(e) => {
            setNewGen(e.target.value);
            setErr(false);
          }}
        />{" "}
        <input
          style={{ width: "200px" }}
          placeholder="프로필 뱃지 내용 입력"
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
  justify-content: center;
  width: 100%;
  height: 3rem;
`;
export default SetProfileBadge;
