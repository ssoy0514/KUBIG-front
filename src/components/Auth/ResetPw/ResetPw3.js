import React from "react";
import { Wrapper, IconText, ButtonWrapper, Button } from "../CommonComponents"; // 이전에 정의한 스타일 컴포넌트를 불러옴
import AuthLogo from "../../../image/AuthLogo.png";
import { NavLink } from "react-router-dom";

const Step3 = ({ success, setStep }) => (
  <Wrapper style={{ height: "max-content" }}>
    <IconText style={{ marginBottom: "2rem" }}>
      <img src={AuthLogo} alt="logo" />
      {success ? (
        <>
          <h1>비밀번호 재설정 완료!</h1>
          <h4>변경된 비밀번호로 로그인 해주세요.</h4>
        </>
      ) : (
        <>
          <h1>비밀번호 재발급 실패</h1>
          <h4>다시 시도해주세요.</h4>
        </>
      )}
    </IconText>
    {success ? (
      <>
        <NavLink to="/">
          <Button fc={"#fff"} c={"#9E1F15"} w={26} h={3.5} br={0.5} fs={1}>
            홈으로
          </Button>
        </NavLink>
      </>
    ) : (
      <>
        <ButtonWrapper>
          <Button
            fc={"#fff"}
            c={"#BDBDBD"}
            w={10.6875}
            h={2.5}
            br={0.7}
            fs={1}
            onClick={() => {
              setStep(1);
            }}
          >
            비밀번호 찾기/재발급
          </Button>

          <NavLink to="/auth/login">
            <Button fc={"#fff"} c={"#9E1F15"} w={4.9375} h={2.5} br={0.7} fs={1}>
              로그인
            </Button>
          </NavLink>
        </ButtonWrapper>{" "}
      </>
    )}
  </Wrapper>
);

export default Step3;
