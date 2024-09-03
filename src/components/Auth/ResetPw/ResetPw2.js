import React from "react";
import { NavLink } from "react-router-dom";
import {
  Wrapper,
  IconText,
  FormStyled,
  FormBox,
  InputField,
  Button,
  ErrText,
} from "../CommonComponents"; // 이전에 정의한 스타일 컴포넌트를 불러옴
import AuthLogo from "../../../image/AuthLogo.png";
import CheckCircle from "../../../image/checkcircle.svg";
const PWD_REGEX = /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/; //대소문자 구분 없고 하나씩, 특수문자,숫자 필수

const Step2 = ({
  newpwd,
  setNewPwd,
  validPwd,
  setPwdFocus,
  pwdFocus,
  matchPwd,
  setMatchPwd,
  validMatch,
  matchFocus,
  setMatchFocus,
  userRef,
  handleSubmitStep2,
  inputCode,
  handleInputCodeChange,
}) => (
  <Wrapper h={40}>
    <IconText style={{ "margin-bottom": "-3rem" }}>
      <img src={AuthLogo} alt="logo"></img>
      <h1>비밀번호 재설정</h1>
      <h4>재설정할 비밀번호를 입력해주세요.</h4>
    </IconText>

    <FormStyled onSubmit={handleSubmitStep2}>
      <FormBox w={4} h={6}>
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
        <img src={CheckCircle} alt="check" className={validPwd ? "valid" : "hide"}></img>

        <ErrText className={pwdFocus && !validPwd ? "invalid" : "hide"}>
          비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자 (! @ # $ %) 포함
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
          className={validPwd && validMatch && matchPwd ? "valid" : "hide"}
        />
        <ErrText
          id="confirmnote"
          className={matchFocus && (!validMatch || !matchPwd) ? "invalid" : "hide"}
        >
          비밀번호가 일치하지 않습니다.
        </ErrText>
        <FormBox w={4} className="authcode">
          <p>인증번호</p>
          <InputField
            id="findid"
            name="authcode"
            type="text"
            onChange={handleInputCodeChange}
            value={inputCode}
            placeholder="인증번호를 입력하세요."
            aria-invalid={inputCode.length === 6 ? "false" : "true"}
            aria-describedby="confirmnote"
            required
          />

          <img
            src={CheckCircle}
            alt="check"
            className={inputCode.length === 6 ? "valid" : "hide"}
          />
        </FormBox>
        <Button
          type="submit"
          style={{ "margin-top": "-3rem" }}
          disabled={!validMatch || !matchPwd || !validMatch || inputCode.length !== 6}
          c={!validMatch || !matchPwd || !validMatch || inputCode.length !== 6 ? "#E5E6E9" : ""}
          fc={!validMatch || !matchPwd || !validMatch || inputCode.length !== 6 ? "#979797" : ""}
        >
          확인
        </Button>
      </FormBox>
    </FormStyled>
  </Wrapper>
);

export default Step2;
