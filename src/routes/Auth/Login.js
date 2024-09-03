//import { json } from "react-router-dom";
//import LoginSuccess from "../../components/Auth/LoginSuccess";
import { useRef, useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import AuthContext from "../../components/Auth/AuthContext";
import axios from "../../api/axios";
import AuthLogo from "../../image/AuthLogo.png";
import Clear from "../../image/ic.svg";
import {
  PageWrapper,
  Wrapper,
  IconText,
  FormStyled,
  FormBox,
  InputField,
  Button,
  MenuBar,
} from "../../components/Auth/CommonComponents";

const LOGIN_URL = process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/login";
//////////////////

const Login = () => {
  const authCtx = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (userRef && userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    if (errMsg) {
      setShowPopup(true);

      const popupTimeout = setTimeout(() => {
        setShowPopup(false);
        //setErrMsg("");
      }, 1000); // 1초 후에 팝업을 숨김

      return () => clearTimeout(popupTimeout);
    }
  }, [errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: pwd,
      });

      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const role = response?.data?.roles;
      const name = response?.data?.name;
      authCtx.setName(name);
      authCtx.setRole(role);

      window.location.href = "/";
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg(err.response?.data.message);
      } else {
        setErrMsg("Login Failed");
      }
      console.log(errMsg);
      if (errRef && errRef.current) errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <NavLink to="/" />
      ) : (
        <>
          <PageWrapper>
            <Wrapper>
              <IconText>
                <img src={AuthLogo} alt="logo"></img>
                <h1>로그인</h1>
              </IconText>

              {errMsg != "" && (
                <PopupContainer
                  ref={errRef}
                  className={errMsg ? "errmsg" : "hide"}
                  aria-live="assertive"
                  show={errMsg != ""}
                >
                  {errMsg}
                </PopupContainer>
              )}

              <FormStyled
                onSubmit={handleSubmit}
                style={{
                  "margin-top": "-3rem",
                }}
              >
                <FormBox
                  style={{
                    height: "5rem", //margin-bottom": "-3rem",
                  }}
                >
                  <p>아이디</p>
                  <InputField
                    type="text"
                    id="user"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                  />
                  {user && (
                    <img
                      src={Clear}
                      alt="clear"
                      style={{
                        opacity: user ? 1 : 0,
                        cursor: "pointer",
                        position: "relative", // Add this line
                        bottom: "7rem", // Add this line
                        //transform: "translateY(-50%)", // Add this line
                      }}
                      onClick={() => setUser("")}
                    />
                  )}
                </FormBox>

                <FormBox
                  style={{
                    height: "5rem",
                    //position: "relative", // Add this line
                  }}
                >
                  <p>비밀번호</p>
                  <InputField
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력하세요."
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-describedby="pwdnote"
                  />
                  {pwd && (
                    <img
                      src={Clear}
                      alt="clear"
                      style={{
                        opacity: pwd ? 1 : 0,
                        cursor: "pointer",

                        position: "relative", // Add this line
                        bottom: "7rem",
                      }}
                      onClick={() => setPwd("")}
                    />
                  )}
                </FormBox>
                <Button type="submit" style={{ marginTop: "2rem" }}>
                  로그인
                </Button>
              </FormStyled>

              <>
                <MenuBar
                  style={{
                    position: "relative",
                    bottom: "2rem",
                    padding: "0",
                  }}
                >
                  <Remember>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" />
                    <p>아이디 저장</p>
                  </Remember>
                  <div className="tools">
                    {" "}
                    <NavLink to="/auth/findid">
                      <p>아이디 찾기</p>
                    </NavLink>
                    <NavLink to="/auth/resetpw">
                      <p>비밀번호 재발급</p>
                    </NavLink>
                    <p style={{ color: "#9e1f15" }}>|</p>
                    <NavLink to="/auth/register">
                      <p style={{ color: "#9e1f15" }}>회원가입</p>
                    </NavLink>
                  </div>
                </MenuBar>
              </>
            </Wrapper>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Login;

const Remember = styled.div`
  display: flex;
  justify-items: center;
  position: relative;
  left: -0.5rem;
  bottom: -3.2rem;
  p {
    color: #424242;
    font-size: 0.975rem;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    width: 6rem;

    position: relative;
    left: -3px;
  }

  input {
    width: 1rem;
    height: 1rem;
    opacity: 0;
    cursor: pointer;
  }

  label {
    position: absolute;
    width: 1rem;
    height: 1rem;
    border: 0.2rem solid rgba(50, 50, 50, 0.1);
    border-radius: 50%;
    position: relative;
    left: -15px;
    //top: 3px;
    cursor: pointer;
  }
  input:checked + label {
    border: 2px solid #9e1f15;
    background: radial-gradient(circle at center, #9e1f15 40%, transparent 40%);
  }
  input:hover + label {
    border-color: #9e1f1580;
    outline: 0;
  }
`;

const PopupContainer = styled.div`
  position: absolute;

  top: 20rem;
  z-index: 9999;
  margin-bottom: -3rem;
  color: rgba(255, 105, 105);
  text-align: center;
  transition: opacity 0.3s ease-in-out;
  opacity: 1; //${(props) => (props.show ? 1 : 0)};
`;

/*   */
