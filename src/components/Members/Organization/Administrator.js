import { styled } from "styled-components";
import AdminCard from "./AdminCard";
import OrgLogo from "../../../image/NavLogo.png";
import PageSelect from "../common/PageSelect";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function Administrator(props) {
  const { g } = props;

  const [admins, setAdmins] = useState([
    { status: "학회장", gen: 19, name: "김지윤" },
  ]);

  const fetch = async () => {
    const result = await axios.get(
      process.env.REACT_APP_KUBIG_PUBLIC_API_URL + `/auth/admins`
    );
    if (result.data) {
      setAdmins(
        result.data.map((admin) => {
          return {
            status: admin.adminRole,
            gen: admin.gen,
            name: admin.name,
          };
        })
      );
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const presidents = admins.filter((admin) => admin.status === "학회장");

  const adminList = admins
    .filter((admin) => admin.status !== "학회장")
    .sort((a, b) => a.status - b.status);
  const adminlist1 = adminList.slice(0, Math.floor(adminList.length / 2)); // 오른쪽 :기획 1, 2, 홍보팀장
  const adminlist2 = adminList.slice(
    Math.floor(adminList.length / 2),
    adminList.length
  ); // 왼: 기3,대협,인사,재무

  return (
    presidents.length > 0 &&
    adminlist1.length > 0 &&
    adminlist2.length > 0 && (
      <Wrapper>
        <PageSelect p={"org"} />
        <TitleBox>
          <h1>KUBIG {g}th Administrator</h1>
        </TitleBox>

        <Wrapper className="top">
          <ContentContainer>
            <img className="logo" src={OrgLogo} alt="logo"></img>
            <GenText>
              <p>{g}기</p>
            </GenText>
            <LineContainer>
              <RedCircle />
              <Line h={1.625} w={0.0625} />
            </LineContainer>
            <div style={{ display: "flex" }}>
              {new Array(presidents.length - 1).fill(0).map(() => (
                <Bar
                  style={{
                    width: "18.725rem",
                    borderRightColor: "transparent",
                  }}
                />
              ))}
              <Bar style={{ width: 0, borderRightColor: "transparent" }} />
            </div>

            <CircleContainer>
              {new Array(presidents.length).fill(0).map(() => (
                <RedCircle />
              ))}
            </CircleContainer>

            <ContentTop>
              {presidents.map((presidents, i) => (
                <AdminCard admin={presidents} key={i} /> //
              ))}
            </ContentTop>
          </ContentContainer>
        </Wrapper>

        <Wrapper className="bottom">
          <ContentBottom>
            <Line w={34} h={0.6875} m={0.88} />
            <Cards>
              {adminlist1.map((admin, i) => (
                <AdminCard admin={admin} key={i} />
              ))}
            </Cards>
          </ContentBottom>
          <ContentBottom>
            <Line w={34} h={0.6875} m={0.88} />
            <Cards>
              {adminlist2.map((admin, i) => (
                <AdminCard admin={admin} key={i} />
              ))}
            </Cards>
          </ContentBottom>
        </Wrapper>
      </Wrapper>
    )
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5rem 15vw 5rem 15vw;
  //padding-left: 15vw;
  //padding-right: 15vw;

  .top {
    justify-content: center;
    margin-bottom: 0;
    padding-bottom: 2rem;
  }
  .bottom {
    display: flex;
    flex-direction: row;
    gap: 2.3rem;
    justify-content: center;
    padding: 0%;
    margin-top: 0;
  }
`;

const TitleBox = styled.div`
  h1 {
    color: #9e1f15;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
  }
  /* H1 */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  .logo {
    width: 5.57363rem;
    height: 2.84806rem;
  }
`;

const GenText = styled.div`
  display: flex;
  align-items: center;

  padding: 1.13rem 1.13rem;
  margin-top: 1.21rem;
  margin-bottom: 0.56rem;

  width: 4.4375rem;
  height: 1.625rem;
  border-radius: 3.125rem;
  background: #9e1f15;

  p {
    color: #fff;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
  }
`;

const RedCircle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #9f1f15;
`;
const CircleContainer = styled.div`
  display: flex;
  gap: 18.225rem;
  margin-bottom: 0;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Bar = styled.div`
  width: 20.8125rem;
  height: 2.5rem;
  border: 0.0625rem solid #9f1f15;
  border-bottom-color: transparent;
`;

const Line = styled.div`
  background-color: ${(props) => props.c || "#9E1F15"};
  height: ${(props) => props.h + "rem"};
  width: ${(props) => props.w + "rem"};
  margin-bottom: ${(props) => props.m + "rem" || "0"};
`;

const ContentTop = styled.div`
  margin-top: 0;
  display: flex;
  gap: 2.75rem;
  justify-content: space-between;
`;

const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1.81rem;
  grid-row-gap: 2.38rem;
`;
