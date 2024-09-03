import { useRef, useState, useEffect } from "react";
import InfoCircle from "../../image/errorcheck.png";
import CheckCircle from "../../image/checkcircle.svg";
import axios from "../../api/axios";
import { styled, css } from "styled-components";
import AuthLogo from "../../image/AuthLogo.png";
import { NavLink } from "react-router-dom";
import optionsData from "../../components/Auth/optionsData";
import ModalPortal from "../../components/common/ModalPortal";

/////////////
const CODE_REGEX = /^[A-z][A-z0-9-_]{3,20}$/; // 일단은 유효성 검사 이걸루
const USER_REGEX = /^[A-z][A-z0-9-_]{3,20}$/; // id 검사
const PWD_REGEX = /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/; //대소문자 구분 없고 하나씩, 특수문자,숫자 필수
const REGISTER_URL = "/auth/register";

////////////
////////////

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [authcode, setAuthcode] = useState("");
  const [validCode, setValidCode] = useState(false);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false); // Inputfield focus

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false); // Inputfield focus

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [name, setName] = useState("");

  const [emailFront, setEmailFront] = useState(""); // Initialize email front part state
  const [emailBack, setEmailBack] = useState(""); // Initialize email back part state
  const email = `${emailFront}@${emailBack}`; // Combine email parts

  const [department, setDepartment] = useState("");
  const [grade, setGrade] = useState(23);
  const [generation, setGeneration] = useState(18);

  const [errMsg, setErrMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [success, setSuccess] = useState(false); // whether success register

  const [isCodeChecked, setIsCodeChecked] = useState(false);
  const [genOption, setGenOption] = useState([]);
  const fetchMaxGen = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + `/auth/generation`
      );
      setGenOption(new Array(response.data + 1).fill(0).map((d, i) => i));
    } catch (err) {
      //alert(err);
    }
  };
  useEffect(() => {
    fetchMaxGen();
  }, []);
  const handleCodeCheck = async (e) => {
    e.preventDefault();
    try {
      await axios.get(process.env.REACT_APP_KUBIG_PUBLIC_API_URL + `/auth/code?code=${authcode}`);
      setIsCodeChecked(true);
    } catch (err) {
      setErrMsg("인증코드가 올바르지 않습니다.");
    }
  };

  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const handleUsernameCheck = async (e) => {
    e.preventDefault();
    try {
      await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + `/auth/username?username=${user}`
      );
      setIsUsernameChecked(true);
    } catch (err) {
      setErrMsg("이미 존재하는 아이디입니다.");
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []); // set focus in username input

  useEffect(() => {
    setValidCode(CODE_REGEX.test(authcode));
  }, [authcode]); // field 바뀔때마다 유효성 검사

  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]); // field 바뀔때마다 유효성 검사

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]); // valid + match > boolean

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, authcode]);

  useEffect(() => {
    if (errMsg) {
      setShowPopup(true);
      const popupTimeout = setTimeout(() => {
        setShowPopup(false);
        setErrMsg("");
      }, 1000); // 1초 후에 팝업을 숨김

      return () => clearTimeout(popupTimeout);
    }
  }, [errMsg]);

  ////이부분 수정
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + `/auth/signup`,
        {
          code: authcode,
          username: user,
          password: pwd,
          name: name,
          email: email,
          major: department,
          studentId: grade,
          generation: generation,
        }
      );

      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg(err.response);
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else if (err.data) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg(err.response?.data?.message);
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  return (
    <>
      {success ? (
        <>
          <ConfirmWrapper>
            <ConfirmIconText>
              <img src={AuthLogo} alt="logo"></img>
              <h1>회원가입 신청 완료!</h1>
              <h3>검토 후 승인이 완료되면 로그인이 가능합니다.</h3>

              <NavLink to="/">
                <Button className="confirm">홈으로</Button>
              </NavLink>
              <p>* 24시간내로 입력하신 메일을 통해 가입 여부를 확인할 수 있습니다.</p>
            </ConfirmIconText>
          </ConfirmWrapper>
        </>
      ) : (
        <>
          <Wrapper className="fluid-wrapper">
            {errMsg && (
              <StyledModal
                ref={errRef}
                className={errMsg ? "errmsg" : "hide"}
                aria-live="assertive"
                isShowing={errMsg && showPopup}
                setIsShowing={setShowPopup}
              >
                <ErrorWrapper>
                  <h4>{errMsg}</h4>
                </ErrorWrapper>
              </StyledModal>
            )}

            <FormStyled onSubmit={handleSubmit}>
              <h2>본인인증</h2>
              <h3>회원 인증 코드</h3>
              <InputGroup>
                <StyledInputGroup>
                  <StyledInput
                    w={"100%"}
                    className={isCodeChecked ? "correct" : validCode ? "valid" : "hide"}
                  >
                    <InputField
                      className="signup"
                      type="text"
                      id="authcode"
                      placeholder="회원 인증 코드를 입력하세요."
                      onChange={(e) => setAuthcode(e.target.value)}
                      value={authcode}
                      ref={userRef}
                      required
                      aria-invalid={validCode ? "false" : "true"}
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      disabled={isCodeChecked}
                      style={isCodeChecked ? { filter: "blur(0.5px)" } : {}}
                    />
                    <img
                      src={CheckCircle}
                      alt="Check"
                      className={isCodeChecked ? "correct" : validCode ? "valid" : "hide"}
                    />
                  </StyledInput>
                </StyledInputGroup>

                <Button
                  onClick={handleCodeCheck}
                  disabled={isCodeChecked || !validCode ? true : false}
                  className={isCodeChecked ? "correct" : validCode ? "valid" : "hide"}
                  w={4.5}
                  h={2.5}
                  fs={0.875}
                  c={"#9E1F15"}
                >
                  {isCodeChecked ? "완료" : "확인"}
                </Button>
              </InputGroup>

              <h3>이름</h3>
              <StyledInput>
                <InputField
                  type="text"
                  id="name"
                  className="signup"
                  placeholder="이름을 입력하세요."
                  //ref={userRef}
                  //autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </StyledInput>

              <h3>소속학과</h3>
              <StyledInput>
                <SelectWrapper>
                  <StyledSelect
                    id="department"
                    placeholder="소속학과를 선택하세요."
                    onChange={(e) => setDepartment(e.target.value)} // Update department state
                    value={department}
                    required
                    //ref={userRef}
                  >
                    <option value="" disabled>
                      소속학과를 선택하세요.
                    </option>
                    {optionsData.DEPARTMENT_OPTIONS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </StyledSelect>
                </SelectWrapper>
              </StyledInput>
              <InputGroup>
                <div className="inner">
                  <h3>학번</h3>
                  <StyledInput w={"15rem"}>
                    <SelectWrapper>
                      <StyledSelect
                        id="grade"
                        placeholder="선택하세요."
                        onChange={(e) => setGrade(e.target.value)} // Update department state
                        value={grade}
                        required
                        //ref={userRef}
                      >
                        {optionsData.GRADE_OPTIONS.map((g) => (
                          <option key={g === -1 ? "교수님" : g} value={g === -1 ? 0 : g}>
                            {g === -1 ? "교수님" : g}
                          </option>
                        ))}
                      </StyledSelect>
                    </SelectWrapper>
                  </StyledInput>
                </div>

                <div className="inner">
                  <h3>기수</h3>
                  <StyledInput w={"15rem"}>
                    <SelectWrapper>
                      <StyledSelect
                        id="generation"
                        placeholder="선택하세요."
                        onChange={(e) => setGeneration(e.target.value)} // Update department state
                        value={generation}
                        required
                        //ref={userRef}
                      >
                        {genOption.map((gen) => (
                          <option key={gen} value={gen}>
                            {gen}
                          </option>
                        ))}
                      </StyledSelect>{" "}
                    </SelectWrapper>
                  </StyledInput>
                </div>
              </InputGroup>

              <h2>회원가입</h2>

              <h3>아이디</h3>
              <InputGroup className="idgroup">
                <StyledInputGroup>
                  <StyledInput
                    w={"100%"}
                    className={userFocus && user && !validUser ? "invalid" : "hide"}
                  >
                    <InputField
                      type="text"
                      id="user"
                      placeholder="아이디를 입력하세요."
                      //ref={userRef}
                      //autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      aria-invalid={validUser ? "false" : "true"}
                      aria-describedby="uidnote"
                      disabled={isUsernameChecked}
                    />
                    <img
                      src={CheckCircle}
                      alt="check"
                      className={isUsernameChecked ? "correct" : validUser ? "valid" : "hide"}
                    ></img>
                  </StyledInput>
                </StyledInputGroup>
                <Button
                  onClick={handleUsernameCheck}
                  w={4.5}
                  h={2.5}
                  fs={0.875}
                  disabled={isUsernameChecked || !validUser}
                >
                  {isUsernameChecked ? "완료" : "중복확인"}
                </Button>
              </InputGroup>

              <ErrText className={userFocus && user && !validUser ? "invalid" : "hide"}>
                아이디: 5~20자의 영문 소문자, 숫자와 특수기호( _ - )만 사용 가능합니다.
              </ErrText>

              <h3>비밀번호</h3>
              <StyledInputGroup>
                <StyledInput className={pwdFocus && !validPwd ? "invalid" : "hide"}>
                  <InputField
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    //ref={userRef}
                    placeholder="비밀번호를 입력하세요. 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <img src={CheckCircle} alt="check" className={validPwd ? "valid" : "hide"}></img>

                  <img
                    src={InfoCircle}
                    alt="info"
                    className={pwdFocus && !validPwd ? "invalid" : "hide"}
                  />
                </StyledInput>
              </StyledInputGroup>

              <ErrText className={pwdFocus && !validPwd ? "invalid" : "hide"}>
                비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자 (! @ # $ %) 가 포함되어야 합니다.
              </ErrText>

              <h3>비밀번호 확인</h3>
              <StyledInputGroup>
                <StyledInput
                  className={matchFocus && (!validMatch || !matchPwd) ? "invalid" : "hide"}
                >
                  <InputField
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    //ref={userRef}
                    placeholder="비밀번호를 입력하세요."
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <img
                    src={CheckCircle}
                    alt="check"
                    className={validPwd && validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <img
                    src={InfoCircle}
                    alt="info"
                    className={matchFocus && (!validMatch || !matchPwd) ? "invalid" : "hide"}
                  />
                </StyledInput>
              </StyledInputGroup>

              <ErrText
                id="confirmnote"
                className={matchFocus && (!validMatch || !matchPwd) ? "invalid" : "hide"}
              >
                비밀번호가 일치하지 않습니다.
              </ErrText>

              <h3>이메일</h3>
              <InputGroup>
                <StyledInput w={"45%"}>
                  <InputField
                    type="text"
                    id="emailFront"
                    placeholder="example"
                    onChange={(e) => setEmailFront(e.target.value)}
                    value={emailFront}
                    //ref={userRef}
                    required
                  />
                </StyledInput>

                <span>@</span>

                <StyledInput w={"45%"}>
                  <InputField
                    type="text"
                    id="emailBack"
                    placeholder="korea.ac.kr"
                    onChange={(e) => setEmailBack(e.target.value)}
                    value={emailBack}
                    //ref={userRef}
                    required
                  />
                </StyledInput>
              </InputGroup>
            </FormStyled>

            <Button
              disabled={
                !isUsernameChecked ||
                !isCodeChecked ||
                !validPwd ||
                !validMatch ||
                !emailFront ||
                !emailBack
              }
              type="submit"
              onClick={handleSubmit}
            >
              회원가입
            </Button>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Register;

const StyledModal = styled(ModalPortal)`
  background: rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;
  border-radius: 1rem;
  //border: 1px solid #dadcdf;
  background: #fff;
  margin: 0 auto 20rem auto;
  padding: 3rem 3rem 2.5rem 3rem;

  //box-shadow: 0px 0px 20px 0px rgba(214, 216, 219, 0.5);

  color: #020202;

  h1 {
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.0625rem;
  }
  h2 {
    font-size: 1.625rem;
    font-weight: 700;
    margin-top: 3rem;
  }
  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-top: 1.87rem;
    margin-bottom: 0.5rem;
  }
  .fluid-wrapper {
    width: 100%;
    max-width: 900px; /* 더 넓은 경우는 필요에 따라 조절 가능 */
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    position: relative;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  margin-bottom: 1rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 90%;
  border: none;
  border-radius: 0.6rem;
  padding: 0.5rem;
  background: #f8f8f8;
  color: #020202;
  appearance: none; /* Remove default arrow */
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #9e1f15;
  }
`;

const IconText = styled.div`
  img {
    width: 8rem;
  }
  h1 {
    text-align: center;
  }
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
  //margin-bottom: 3rem;
  margin: 3rem auto 3rem auto;
  width: 80%;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  width: 100%;
  span {
    line-height: 3rem;
  }
  .idgroup {
    align-items: center;
  }
`;

const StyledInput = styled.div`
  border-radius: 0.6rem;
  border: 1.43px solid #e5e5e5;
  background: #f8f8f8;
  width: ${(props) => (props.w ? props.w : "auto")};
  height: 3rem;
  padding-left: 1rem;
  padding-right: 2rem;
  transition: border-color 0.2s ease-in-out;

  img {
    position: relative;
    top: 0.2rem;
    left: 2rem;
    width: 1rem;
  }

  select:focus,
  input:focus {
    outline: 0;
    background-color: transparent;
  }
  .correct {
    opacity: 0.1;
    margin-left: 0.25rem;
    position: relative;
    top: 0.2rem;
    left: 2rem;
  }
  .valid {
    opacity: 0.4;
    margin-left: 0.25rem;
  }
  .invalid {
    color: #ff6969;
    margin-left: 0.25rem;
  }

  .hide {
    opacity: 0; //display: none;
  }

  &:focus-within {
    outline: 0;
    border: #cacaca solid 2px;
    //background-color: #dadcdf80;
  }
`;

const StyledInputGroup = styled.div`
  width: 100%;
  &:focus-within .invalid {
    outline: 0;
    border: #ff6969 solid 1.5px;
    background-color: rgba(255, 105, 105, 0.1);
  }
  &:focus-within .invalid > img {
    outline: 0;
    border: none;
    background-color: transparent;
  }
`;

const InputField = styled.input`
  width: 90%;
  height: 90%;
  border-color: transparent;
  background-color: transparent;

  color: #020202;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
  padding-top: 0.3rem;
  &::placeholder {
    color: #bdbdbd;
    font-size: 1rem;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px transparent inset;
    -webkit-text-fill-color: #000;
  }

  &:focus {
    outline: 0;
    background-color: transparent;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const ErrText = styled.div`
  font-size: 0.75rem;
  border-radius: 0.5rem;
  color: #ff6969;
  padding: 0.25rem;
  position: relative;
  z-index: 99;
  //bottom: -10px;

  &.invalid {
    color: #ff6969;
    margin-left: 0.25rem;
  }
  &.hide {
    display: none;
  }
`;

const Button = styled.button`
  width: ${(props) => (props.w ? props.w + "rem" : "26.6875rem")};
  height: ${(props) => (props.h ? props.h + "rem" : "3.58756rem")};
  border-radius: 0.6rem;
  background: ${(props) => (props.c ? props.c : "#9e1f15")};
  color: #fff;
  text-align: center;
  font-size: ${(props) => (props.fs ? props.fs + "rem" : "1.125rem;")};
  font-weight: 400;
  margin: auto 1rem auto;
  border: 0;
  transition: all 0.2s;

  &:disabled {
    background-color: #bdbdbd;
  }
  &.correct {
    background-color: darkgray;
  }
`;

const ErrorWrapper = styled.div`
  width: 30rem;
  height: 7rem;
  flex-shrink: 0;
  justify-content: center;
  border-radius: 0.6rem;
  h4 {
    color: #ff6969;
    text-align: center;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: 7rem;
  }

  background: #fff;
  transition: opacity 0.3s ease-out;

  //opacity: ${(props) => (props.show ? 1 : 0)};
`;

const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.75rem;
  height: 28rem;
  border-radius: 1rem;
  //border: 1px solid #dadcdf;
  background: #fff;
  margin: 10rem auto 20rem auto;
  padding: 3rem 0 2.5rem 0;

  box-shadow: 0px 0px 20px 0px rgba(214, 216, 219, 0.5);
`;

const ConfirmIconText = styled.div`
  align-items: center;
  text-align: center;
  color: #020202;
  img {
    margin: 2rem auto 2rem auto;
    width: 6rem;
    flex-shrink: 0;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }
  h3 {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 300%;
    margin-bottom: 3rem;
  }
  p {
    color: #6e6e70;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 400;
    position: relative;
    bottom: -6rem;
  }
`;
