import React from "react";
import { NavLink } from "react-router-dom";
import {
  Wrapper,
  IconText,
  FormStyled,
  FormBox,
  InputField,
  MenuBar,
  Button,
} from "../CommonComponents"; // 이전에 정의한 스타일 컴포넌트를 불러옴
import AuthLogo from "../../../image/AuthLogo.png";
import CheckCircle from "../../../image/checkcircle.svg";

const Step1 = ({ email, validEmail, userRef, handleSubmitStep1, handleEmailChange }) => (
  <Wrapper h={28.125}>
    <IconText>
      <img src={AuthLogo} alt="logo"></img>
      <h1>아이디 찾기</h1>
      <h4>가입시 등록한 이메일을 입력하세요.</h4>
    </IconText>
    <FormStyled onSubmit={handleSubmitStep1}>
      <FormBox w={4}>
        <p>이메일</p>
        <InputField
          id="email"
          name="email"
          type="text"
          onChange={handleEmailChange}
          value={email}
          ref={userRef}
          placeholder="user123@korea.ac.kr"
          aria-invalid={validEmail ? "false" : "true"}
        />
        <img src={CheckCircle} alt="check" className={validEmail ? "valid" : "hide"} />
      </FormBox>

      <MenuBar style={{ "margin-top": "2rem" }}>
        <div className="menu">
          <NavLink to="/auth/login" className="login">
            <p>로그인으로 돌아가기</p>
          </NavLink>
          <p>|</p>
          <NavLink to="/auth/resetpw" className="resetpw">
            <p>비밀번호 재발급</p>
          </NavLink>
        </div>
        <Button
          type="submit"
          className="confirm"
          disabled={!validEmail}
          c={!validEmail ? "#E5E6E9" : ""}
          fc={!validEmail ? "#979797" : ""}
        >
          확인
        </Button>
      </MenuBar>
    </FormStyled>
  </Wrapper>
);

export default Step1;
