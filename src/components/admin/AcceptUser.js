import { useEffect, useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";
import optionsData from "../Auth/optionsData";

function AcceptUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/user/accept")
      .then((res) => {
        setUsers(res.data);
      });
  }, []);
  const handleCheck = (id) => {
    axios
      .post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/user/accept/" + id
      )
      .catch((err) => {
        alert("Error!");
      });
  };
  const handleRemove = (id) => {
    axios
      .post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
          "/auth/user/accept/remove/" +
          id
      )
      .catch((err) => {
        alert("Error!");
      });
  };

  return (
    <Container>
      <h5>acceptable User 목록</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
        회원가입 대기 중인 유저 목록
      </p>
      <div style={{ marginTop: 5 }}>
        {users.map((user) => (
          <Label style={{ marginTop: 5 }}>
            {user.generation} 기 {user.name} | id: {user.username}, email:{" "}
            {user.email} <br />
            <div>
              <Button
                w={5}
                h={2}
                style={{ marginRight: 5, hover: "pointer" }}
                onClick={() => {
                  handleCheck(user.id);
                  setUsers(users.filter((item) => item.id !== user.id));
                }}
              >
                수락
              </Button>
              <Button
                w={5}
                h={2}
                style={{ hover: "pointer" }}
                onClick={() => {
                  handleRemove(user.id);
                  setUsers(users.filter((item) => item.id !== user.id));
                }}
              >
                삭제
              </Button>
            </div>
          </Label>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;
const Label = styled.label`
  width: 26.6875rem;
  height: 5rem;
  background: whitesmoke;
  border: 1px solid;
  color: black;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputFile = styled.input`
  display: none;
`;
export default AcceptUser;
