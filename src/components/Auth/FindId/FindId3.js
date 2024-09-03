import React from "react";
import { Wrapper, IconText, IdWrapper, ButtonWrapper, MenuBar, Button } from "../CommonComponents"; // 이전에 정의한 스타일 컴포넌트를 불러옴
import AuthLogo from "../../../image/AuthLogo.png";
import { NavLink } from "react-router-dom";

const Step3 = ({ success, findResult, setStep }) => (
  <Wrapper style={{ height: "max-content" }}>
    <IconText>
      <img src={AuthLogo} alt="logo" />
      {success ? (
        <>
          <h1>아이디 찾기 완료!</h1>
          <h4>입력한 정보와 일치하는 아이디입니다</h4>
        </>
      ) : (
        <>
          <h1>아이디 찾기 실패</h1>
          <h4>입력한 정보와 일치하는 아이디가 없습니다</h4>
        </>
      )}
    </IconText>
    {success ? (
      <>
        {findResult.map((f) => (
          <IdWrapper>
            <h1>{f}</h1>
          </IdWrapper>
        ))}
        <ButtonWrapper>
          <NavLink to="/auth/resetpw">
            <Button fc={"#fff"} c={"#BDBDBD"} w={10.6875} h={2.5} br={0.7} fs={1}>
              비밀번호 찾기/재발급
            </Button>
          </NavLink>

          <NavLink to="/auth/login">
            <Button fc={"#fff"} c={"#9E1F15"} w={4.9375} h={2.5} br={0.7} fs={1}>
              로그인
            </Button>
          </NavLink>
        </ButtonWrapper>{" "}
      </>
    ) : (
      <>
        <ButtonWrapper style={{ "margin-top": "4rem" }}>

            <Button fc={"#fff"} c={"#BDBDBD"} w={6} h={2.5} br={0.675} fs={1}onClick={()=>{setStep(1)}}>
              아이디 찾기
            </Button>


          <NavLink to="/auth/login">
            <Button fc={"#fff"} c={"#9E1F15"} w={4.9375} h={2.5} br={0.675} fs={1}>
              로그인
            </Button>
          </NavLink>
        </ButtonWrapper>{" "}
      </>
    )}
  </Wrapper>
);

export default Step3;
