import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";

function RemoveUser() {
  const [newGen, setNewGen] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [err, setErr] = useState(false);
  const handleCheck = (gen) => {
    axios
      .post(process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/user/remove", {
        gen: newGen,
        name: name,
        studentId: id,
      })
      .then((res) => {
        setErr(true);
      })
      .catch((err) => {
        alert("일치하는 정보가 없습니다.");
      });
  };

  return (
    <Container>
      <h5>샘플 유저 삭제</h5>

      <p style={{ color: "gray", fontSize: "small" }}>
        샘플유저로 등록된 학회원이 회원가입을 해서 members 페이지에 중복되어 뜰
        경우, 샘플 유저 목록에서 삭제해주시면 됩니다.
        <br />실 가입 멤버 탈퇴는 불가능합니다.
      </p>

      <div style={{ display: "flex" }}>
        <input
          style={{ width: "100px" }}
          placeholder="기수 입력 (15,16..)"
          onChange={(e) => {
            setNewGen(e.target.value);
            setErr(false);
          }}
        />{" "}
        <input
          style={{ width: "100px", marginLeft: 5 }}
          placeholder="이름 입력"
          onChange={(e) => {
            setName(e.target.value);
            setErr(false);
          }}
        />{" "}
        <input
          style={{ width: "100px", marginLeft: 5 }}
          placeholder="학번 입력(19, 20, 21..)"
          onChange={(e) => {
            setId(e.target.value);
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
  height: 5rem;
`;

export default RemoveUser;
