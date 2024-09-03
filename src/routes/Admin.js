import { useState } from "react";
import Check from "../components/admin/Check";
import UpdateAdminPw from "../components/admin/UpdateAdminPw";
import SetMaxGen from "../components/admin/SetMaxGen";
import AddSemester from "../components/admin/AddSemester";
import AddProjectCategory from "../components/admin/AddProjectCategory";
import AddStudyCategory from "../components/admin/AddStudyCategory";
import RemoveAdmin from "../components/admin/RemoveAdmin";
import AddAdmin from "../components/admin/AddAdmin";
import SetAdminRole from "../components/admin/SetAdminRole";
import SetProfileBadge from "../components/admin/SetProfileBadge";
import RemoveUser from "../components/admin/RemoveUser";
import AddSampleUser from "../components/admin/AddSampleUser";
import ChangeCode from "../components/admin/ChangeCode";
import AcceptUser from "../components/admin/AcceptUser";
import RemoveProjectCategory from "../components/admin/RemoveProject";
import RemoveStudyCategory from "../components/admin/RemoveStudyCategory";
import { Container } from "react-bootstrap";
import styled from "styled-components";

function Admin() {
  const [verified, setVerified] = useState(false);

  return !verified ? (
    <Check handler={setVerified}></Check>
  ) : (
    <Wrapper>
      <UpdateAdminPw />
      <AddAdmin />
      <RemoveAdmin />

      <ChangeCode />
      <AcceptUser />

      <SetMaxGen />
      <AddSemester />

      <AddProjectCategory />
      <RemoveProjectCategory />

      <AddStudyCategory />
      <RemoveStudyCategory />

      <SetAdminRole />
      <SetProfileBadge />

      <AddSampleUser />
      <RemoveUser />
    </Wrapper>
  );
}

export default Admin;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8rem auto 8rem auto;
  padding: 5rem;
  justify-items: center;
  align-items: center;

  width: 60rem;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 16px;
`;
