import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { MenuData } from "./MenuData";

import Logo from "../../../image/KUBIG_logo-04.png";
import MenuItems from "./MenuItems";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Auth/AuthContext";
import client, { refresh } from "../../../lib/httpClient";
import MyPageButton from "../../../image/MyPageButton.svg";
import { AddButton } from "../AddButton";
export default function Navbar() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem("accessToken") && authCtx.name === "") {
      fetch();
    } else if (localStorage.getItem("refreshToken")) {
      refresh().then(() => {
        fetch();
      });
    }
  }, []);

  const fetch = async () => {
    try {
      const response = await client.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/profile"
      );
      if (!response.data || !(response.data.name && response.data.role)) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } else {
        authCtx.setName(response.data.name);
        authCtx.setRole(response.data.role);
      }
    } catch (err) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <NavWrapper>
      <NavContent>
        <LogoContainer>
          <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} alt="KUBIG logo" style={{ height: "42px" }}></img>
          </NavLink>
        </LogoContainer>

        <NavigationContainer>
          <Ul>
            {MenuData.map((menu, index) => {
              return <MenuItems items={menu} key={index} />;
            })}
          </Ul>
        </NavigationContainer>

        <AuthContainer>
          {authCtx.name !== "" ? (
            <>
              <ProfileContainer
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <p className="name">{authCtx.name}님</p>
                <img
                  alt="mypage"
                  src={MyPageButton}
                  width={40}
                  height={40}
                  onClick={toggleDropdown}
                />

                <Dropdown isOpen={dropdownOpen}>
                  <DropdownItem>
                    <NavLink to="/auth/mypage">
                      <p>MY PAGE</p>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to="/">
                      <p
                        onClick={() => {
                          client.get("/auth/logout").then((res) => {
                            localStorage.removeItem("accessToken");

                            localStorage.removeItem("refreshToken");
                            authCtx.setName("");
                            authCtx.setRole("");
                            window.location.href = "/";
                          });
                        }}
                        style={{ fontSize: "14px" }}
                      >
                        LOGOUT
                      </p>
                    </NavLink>
                  </DropdownItem>
                </Dropdown>
              </ProfileContainer>
            </>
          ) : (
            <>
              <NavLink to="/auth/register">
                <JoinBtn>JOIN</JoinBtn>
              </NavLink>

              <NavLink to="auth/login">
                <LoginBtn>LOGIN </LoginBtn>
              </NavLink>
            </>
          )}
        </AuthContainer>
      </NavContent>
    </NavWrapper>
  );
}

const NavWrapper = styled.header`
  position: sticky; //absolute;
  overflow: visible;

  flex-wrap: wrap;
  justify-content: space-between;
  top: 0;
  left: 0;
  z-index: 999;
  margin: 0;
  width: 100%;
  height: 82px;
  -webkit-user-select: none;
  user-select: none;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 15px 0px rgba(90, 90, 90, 0.1);
`;

const Ul = styled.ul`
  display: flex;
  //justify-content: space-evenly;
  height: 100%;
  gap: clamp(2.3rem, 4%, 2.87rem);
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 14px 5vw 14px 5vw;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  //margin-right: auto;
`;

const NavigationContainer = styled.nav`
  display: flex;
  //justify-content: space-evenly;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  width: fit-content;
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  margin-left: 1rem;
  height: 100%;
`;

const LoginBtn = styled(AddButton)`
  padding: 6px 10px;
  font-size: 11px;
  a {
    font-weight: 400;
    line-height: 16px;
  }
`;
const JoinBtn = styled(AddButton)`
  background: #fff;
  color: #1e1e1e;
  padding: 6px 10px;
  margin-right: -20px;
  font-size: 11px;
  a {
    font-weight: 400;
    line-height: 26px;
  }
  &:hover {
    background: #f6f6f6;
    transition: all 0.2s;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  //flex-direction: column;
  white-space: nowrap;
  gap: 15px;
  justify-content: flex-end;
  cursor: pointer;
  margin-right: auto;
  //position: absolute;
  right: 3rem;
  p {
    font-size: 13px;
    width: 40px;
    text-align: right;
    line-height: 40px;

    //line-height: 40px;
    //margin: auto 0 auto 0;
    color: #1e1e1e;
  }
  //position: fixed;
  //z-index: 9999;
`;

const Dropdown = styled.div`
  position: fixed;
  top: 60px;
  right: 50px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  text-align: center;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  //margin-right: auto;
  //margin-left: auto;
  border-bottom: 1px solid #e0e0e0;

  width: 8rem;
  text-align: center;
  p {
    width: 8rem;
    text-align: center;
  }
  &:hover {
    background-color: #f1f1f1;
  }

  &:last-child {
    border-bottom: none;
  }
`;
