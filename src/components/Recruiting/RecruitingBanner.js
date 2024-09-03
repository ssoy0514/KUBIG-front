import { styled } from "styled-components";
//import RecruitingImg from "../../image/RecruitingImage.png";
import KubigRedLogo from "../common/KubigRedLogo";

export default function RecruitingBanner({ imgurl }) {
  return (
    <RecruitingBannerWrapper image={imgurl}>
      <KubigRedLogo />
      <h2>Everyone has a role</h2>
    </RecruitingBannerWrapper>
  );
}
const RecruitingBannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.25rem;
  width: auto;
  height: 27.375rem;
  flex-shrink: 0;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    url(${(props) => process.env.PUBLIC_URL + `/images/${props.image}`}),
    lightgray 50% / cover no-repeat;
  background-size: cover;

  h2 {
    color: #fff;
    text-align: center;
    font-size: 2rem;
    font-style: normal;
    font-weight: 200;
    line-height: 100%;
    margin: 0;
  }
`;
