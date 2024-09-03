import { styled } from "styled-components";
import MembersImg from "../../../image/MembersImg.png";

export default function MemberBanner() {
  return (
    <MemberBannerContainer>
      <MemberTextContainer>
        <h1>
          <b>KUBIG </b>의 멤버를 소개합니다
        </h1>
      </MemberTextContainer>
    </MemberBannerContainer>
  );
}

const MemberBannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 27.375rem;
  flex-shrink: 0;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    url(${MembersImg}), lightgray 50% / cover no-repeat;
  background-size: cover;
`;

const MemberTextContainer = styled.div`
  h1 {
    color: #ffffff;
    text-align: center;
    font-size: 3rem;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 3rem */
  }
  h1 b {
    color: #ffffff;
    font-weight: 700;
  }
`;
