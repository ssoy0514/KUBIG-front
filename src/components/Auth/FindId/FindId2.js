import React from "react";
import { NavLink } from "react-router-dom";
import {
  Wrapper,
  IconText,
  FormStyled,
  FormBox,
  InputField,
  Button,
  MenuBar,
} from "../CommonComponents"; // 이전에 정의한 스타일 컴포넌트를 불러옴
import AuthLogo from "../../../image/AuthLogo.png";
import CheckCircle from "../../../image/checkcircle.svg";

const Step2 = ({
  email,
  userRef,
  handleSubmitStep2,
  handleEmailChange,
  inputCode,
  handleInputCodeChange,
  validEmail,
  sendMail,
}) => (
  <Wrapper h={32.625}>
    <IconText>
      <img src={AuthLogo} alt="logo"></img>
      <h1>아이디 찾기</h1>
      <h4>가입시 등록한 이메일을 입력하세요.</h4>
    </IconText>
    <FormStyled onSubmit={handleSubmitStep2}>
      <FormBox w={4} h={8}>
        <p>이메일</p>
        <InputField
          id="email"
          name="email"
          type="text"
          onChange={handleEmailChange}
          value={email}
          ref={userRef}
          placeholder="user123@korea.ac.kr "
          aria-invalid={validEmail ? "false" : "true"}
          disabled
        />
        <Button
          className="resend"
          w={4.435}
          h={1.75}
          fs={0.75}
          br={1.875}
          onClick={sendMail}
          type="button"
        >
          다시 받기
        </Button>
      </FormBox>

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

        <img src={CheckCircle} alt="check" className={inputCode.length === 6 ? "valid" : "hide"} />
      </FormBox>

      <MenuBar style={{ bottom: "2rem" }}>
        <div className="menu">
          <NavLink to="/auth/login" className="login">
            <p>로그인으로 돌아가기</p>
          </NavLink>
          <p>|</p>
          <NavLink to="/auth/resetpw" className="resetpw">
            <p> 비밀번호 재발급</p>
          </NavLink>
        </div>
        <Button
          type="submit"
          className="confirm"
          disabled={inputCode.length !== 6}
          c={inputCode.length !== 6 ? "#E5E6E9" : ""}
          fc={inputCode.length !== 6 ? "#979797" : ""}
        >
          확인
        </Button>
      </MenuBar>
    </FormStyled>
  </Wrapper>
);

export default Step2;
