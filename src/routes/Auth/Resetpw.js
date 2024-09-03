import { useRef, useState, useEffect } from "react";
//import { NavLink } from "react-router-dom";
//import { Wrapper, IconText } from "../CommonComponents";
//import AuthLogo from "../../../image/AuthLogo.png";
import Step1 from "../../components/Auth/ResetPw/ResetPw1";
import Step2 from "../../components/Auth/ResetPw/ResetPw2";
import Step3 from "../../components/Auth/ResetPw/ResetPw3";
import axios from "axios";
//import { styled } from "styled-components";
//import CheckCircle from "../../image/checkcircle.svg";

const RESET_URL = "/auth/resetpw";
const PWD_REGEX = /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/; //대소문자 구분 없고 하나씩, 특수문자,숫자 필수
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function Resetpw() {
  const userRef = useRef();
  //const errRef = useRef();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false); // Inputfield focus

  const [newpwd, setNewPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false); // Inputfield focus

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const handleInputCodeChange = (e) => {
    const newInputCode = e.target.value;
    setInputCode(newInputCode);
  };
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(newpwd));
    setValidMatch(newpwd === matchPwd);
  }, [newpwd, matchPwd]); // valid + match > boolean

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setValidEmail(EMAIL_REGEX.test(newEmail));
  };
  // 이메일 유효성 검사
  const step1Handler = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
          "/mail/send/pwd?to=" +
          email +
          "&username=" +
          user
      );
      if (res.data.result) {
        setStep(2);
      } else {
        throw Error("일치하는 정보가 없습니다.");
      }
    } catch (err) {
      alert(err);
    }
  };

  const step2Handler = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
          "/mail/reset/pwd?code=" +
          inputCode +
          "&email=" +
          email,
        { username: user, password: newpwd }
      );
      setSuccess(res.data.result);
      setStep(3);
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    step1Handler();
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    step2Handler();
  };
  return (
    <>
      {step === 1 && (
        <Step1
          email={email}
          validEmail={validEmail}
          emailFocus={emailFocus}
          setEmailFocus={setEmailFocus}
          user={user}
          setUser={setUser}
          userRef={userRef} // userRef 관련 처리 추가
          handleSubmitStep1={handleSubmitStep1}
          handleEmailChange={handleEmailChange}
        />
      )}
      {step === 2 && (
        <Step2
          newpwd={newpwd}
          setNewPwd={setNewPwd}
          validPwd={validPwd}
          setPwdFocus={setPwdFocus}
          pwdFocus={pwdFocus}
          matchPwd={matchPwd}
          setMatchPwd={setMatchPwd}
          validMatch={validMatch}
          matchFocus={matchFocus}
          setMatchFocus={setMatchFocus}
          userRef={userRef} // userRef 관련 처리 추가
          handleSubmitStep2={handleSubmitStep2}
          inputCode={inputCode}
          handleInputCodeChange={handleInputCodeChange}
        />
      )}
      {step === 3 && <Step3 success={success} setStep={setStep} />}
    </>
  );
}

/*
import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

import CheckCircle from "../../image/checkcircle.svg";
import AuthLogo from "../../image/AuthLogo.png";
import axios from "../../api/axios";

const RESET_URL = "/auth/resetpw";
const PWD_REGEX = /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/; //대소문자 구분 없고 하나씩, 특수문자,숫자 필수

export default function Resetpw() {
  const userRef = useRef();
  //const errRef = useRef();

  const [newpwd, setNewPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false); // Inputfield focus

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(newpwd));
    setValidMatch(newpwd === matchPwd);
  }, [newpwd, matchPwd]); // valid + match > boolean

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(RESET_URL, JSON.stringify({ newpwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      //const accessToken = response?.data?.accessToken;
      //const roles = response?.data?.roles;
      setNewPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <ConfirmWrapper>
          <ConfirmIconText>
            <img src={AuthLogo} alt="logo" />
            <h1>비밀번호 재발급 완료!</h1>
          </ConfirmIconText>
          <h4>변경된 비밀번호로 로그인 해주세요.</h4>
          <NavLink to="/auth/login">
            <Button>확인</Button>
          </NavLink>
        </ConfirmWrapper>
      ) : (
        <>
          <Wrapper>
            <IconText>
              <img src={AuthLogo} alt="logo"></img>
              <h1>비밀번호 재설정</h1>
            </IconText>
            <h3>재설정할 비밀번호를 입력해주세요.</h3>

            <FormStyled onSubmit={handleSubmit}>
              <FormBox>
                <p>비밀번호</p>
                <InputField
                  id="newpwd"
                  name="newpwd"
                  type="password"
                  onChange={(e) => setNewPwd(e.target.value)}
                  value={newpwd}
                  ref={userRef}
                  placeholder="새 비밀번호를 입력하세요. "
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <img
                  src={CheckCircle}
                  alt="check"
                  className={validPwd ? "valid" : "hide"}
                ></img>

                <ErrText className={pwdFocus && !validPwd ? "invalid" : "hide"}>
                  비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자 (! @ # $ %)
                  포함
                </ErrText>
              </FormBox>

              <FormBox w={5}>
                <p>비밀번호 확인</p>
                <InputField
                  id="confirm_pwd"
                  name="renewpwd"
                  type="password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  placeholder="새 비밀번호를 입력하세요."
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />

                <img
                  src={CheckCircle}
                  alt="check"
                  className={
                    validPwd && validMatch && matchPwd ? "valid" : "hide"
                  }
                />
                <ErrText
                  id="confirmnote"
                  className={
                    matchFocus && (!validMatch || !matchPwd)
                      ? "invalid"
                      : "hide"
                  }
                >
                  비밀번호가 일치하지 않습니다.
                </ErrText>
              </FormBox>

              <Button type="submit">확인</Button>
            </FormStyled>
          </Wrapper>
        </>
      )}
    </>
  );
}
*/
/*
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.75rem;
  height: max-content;
  border-radius: 1rem;
  //border: 1px solid #dadcdf;
  background: #fff;
  margin: 5rem auto 10rem auto;
  padding: 3rem 0 2.5rem 0;
  box-shadow: 0px 0px 20px 0px rgba(214, 216, 219, 0.5);
  h3 {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }
`;

const IconText = styled.div`
  img {
    width: 8rem;
  }
  h1 {
    color: #020202;
    text-align: center;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 180%;
  }
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  //justify-content: space-evenly;
  flex-grow: 1;
  width: 80%;

  row-gap: 1rem;
`;

const FormBox = styled.div`
  margin-top: 0;
  height: 5.5rem;

  p {
    color: #000;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 180%;
    background-color: #fff;
    width: ${(props) => (props.w ? props.w + "rem" : "3rem")};
    z-index: 9999;
    text-align: center;
    position: relative;
    top: 0.8rem;
    left: 1rem;
  }

  img {
    position: relative;
    top: -3.4rem;
    z-index: 9999;
    left: 24rem;
  }

  select:focus,
  input:focus {
    outline: 0;
  }

  > .valid {
    opacity: 0.5;
    margin-left: 0.25rem;
  }

  > .invalid {
    color: #ff6969;
    margin-left: 0.25rem;
    position: relative;
    bottom: 0.5rem;
  }
  > .hide {
    display: none;
  }
`;

const InputField = styled.input`
  border-radius: 0.3125rem;
  border: 1.43px solid #dadcdf;
  width: 26.6875rem;
  height: 3.5625rem;
  padding-left: 1.8rem;
  padding-top: 0.5rem;
  margin-bottom: 1rem;

  color: #020202;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;

  &:focus {
    outline: 0;
    border: #dadcdf solid 1.5px;
    box-shadow: 0 0 0.5rem #dadcdf;
  }
`;

const Button = styled.button`
  width: 26.72625rem;
  height: 3.58756rem;
  border-radius: 0.3125rem;
  background: #9e1f15;
  color: #fff;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 400;
  margin: 2rem auto 1rem auto;
  position: relative;
  bottom: 0rem;
  z-index: 99;
`;

export const ErrText = styled.div`
  font-size: 0.75rem;
  border-radius: 0.5rem;
  color: #ff6969;
  padding: 0.25rem;
  position: relative;
  top: -1rem;
  height: 0.8rem;

  &.invalid {
    color: #ff6969;
    margin-left: 0.25rem;
  }
  &.hide {
    display: none;
  }
`;

const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.75rem;
  height: 19.5rem;
  border-radius: 1rem;
  //border: 1px solid #dadcdf;
  background: #fff;
  margin: 10rem auto 20rem auto;
  padding: 3rem 0 0.5rem 0;
  box-shadow: 0px 0px 10px 0px rgba(214, 216, 219, 0.5);
`;

const ConfirmIconText = styled.div`
  align-items: center;
  text-align: center;
  color: #020202;
  img {
    width: 6rem;
    flex-shrink: 0;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
`;
*/
