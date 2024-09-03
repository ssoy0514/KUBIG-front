import React from "react";
import styled, { css } from "styled-components";
import SNSBar from "./SNSBar";
import Logo from "../../../image/KUBIG_logo-04.png";

// Footer
export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <Container className="content-container">
          <TopBar>
            <LogoContainer>
              <img src={Logo} alt="KUBIG logo" style={{ width: "100px" }}></img>
              <Textbox>
                <LogotxtContainer>
                  <p>
                    고려대학교
                    <br />
                    데이터사이언스 & AI 학회
                  </p>
                </LogotxtContainer>
              </Textbox>
            </LogoContainer>
          </TopBar>

          <BottomBar>
            <Infobox className="contact-us">
              <p>
                Contact Us
                <br />
                <br />
                Professor | 임성빈 교수님 (고려대 통계학과)
                <br />
                20th President | 방서연 | 010-5336-1269
                <br />
                20th President | 정윤주 | 010-2957-1220
                <br />
                20th President | 하진우 | 010-3318-3994
                <br />
                Gmail | kubigkorea@gmail.com
              </p>
            </Infobox>

            <Infobox className="social">
              <p>Social</p>
              <br />

              <SocialListWrapper>
                <SNSBar />
              </SocialListWrapper>
            </Infobox>
          </BottomBar>
        </Container>
      </Container>
    </FooterWrapper>
  );
}
// Style Components
const FooterWrapper = styled.footer`
  bottom: 0;
  margin-top: auto;
  width: 120rem;
  height: 17rem;
  display: flex;
  justify-content: center;
  width: auto;
`;

const Container = styled.footer`
  position: relative;
  display: flex;
  height: 17rem;
  margin-bottom: 0;
  //align-items: center;
  width: 100%;
  background-color: #1b1c1e;
  justify-content: space-between;
`;

const TopBar = styled.div`
  max-width: auto;

  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;

  padding: 4rem 5rem;
`;

const BottomBar = styled.div`
  display: flex;
  max-width: auto;
  margin-left: auto;
  //margin-top: 1rem;
  justify-content: space-between;

  padding: 3rem 0rem 3.75rem;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  scroll-margin-right: 2vw;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);

  img {
    //opacity: 0.95;
    //border-radius: 50%; /* 원형으로 이미지를 만듭니다 */
    overflow: hidden; /* 이미지의 둥근 부분을 숨깁니다 */
    //box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4); /* 그림자 설정 */
  }
`;

const Textbox = styled.div`
  display: flex;
`;
const LogotxtContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;

  p {
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 1.8rem */
    color: #fff;
  }
  p b {
    color: #fff;
    line-height: 200%;
  }
`;

const Infobox = styled.div`
  margin-bottom: 2rem;
  padding-right: 2rem;
  min-width: 50%;
  width: auto;

  p {
    color: #fff;
    text-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2); //0px 4px 1rem rgba(0, 0, 0, 0.3);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 180%; /* 1.8rem */
  }

  .info-head {
    margin-bottom: 1.5em;
    font-size: 1rem;
    font-weight: 400;
    font-style: normal;
    align-content: start;
    line-height: 4em;
    width: auto;
  }

  min-width: unset;
  margin-bottom: 0;
  margin-right: 2.4rem;
`;

const SocialListWrapper = styled.div`
  display: flex;
  width: auto;
  align-items: center;
`;
