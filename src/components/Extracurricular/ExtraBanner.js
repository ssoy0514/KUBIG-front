import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { AddButton } from "../common/AddButton";

const BannerData = [
  {
    id: 1,
    title: "Partnership",
    description:
      "산업체 및 교육 기관과 협업하여, \n기관이 고민하는 문제에 솔루션을 제시하는 활동을 하고 있습니다.",
    imgUrl: "PartnershipBanner.png",
  },
  {
    id: 2,
    title: "Collaboration",
    description:
      " 여러 다른 학회와 교류를 하며, \n세션 활동 및 공모전 활동까지 여러 활동들을 이어가고 있습니다.",
    imgUrl: "CollaborateBanner.png",
  },
  {
    id: 3,
    title: "Session",
    description:
      "데이터사이언스와 인공지능 분야의 교수님들과 관련 현업에서 \n활동 중이신 OB 선배님들을 초청하여 다양한 세션을 열고 있습니다.",
    imgUrl: "SessionBanner.png",
  },
  {
    id: 4,
    title: "Awards",
    description:
      " KUBIG 학회원들은 우수한 데이터 사이언티스트 및 데이터 엔지니어로서의 \n역량을 발휘하여 다수의 대회에서 뛰어난 성과를 거두어왔습니다.",
    imgUrl: "AwardBanner.png",
  },
];

export default function ExtraBanner({ id, isAdmin }) {
  const selectedBanner = BannerData.find((banner) => banner.id === id);
  let url = "/extra/new";
  if (id === 4) {
    url = "/extra/awards/new";
  }
  return (
    <BannerContainer image={selectedBanner.imgUrl}>
      <TextContainer>
        <h1>{selectedBanner.title}</h1>
        <p style={{ whiteSpace: "pre-line" }}>{selectedBanner.description}</p>
      </TextContainer>


      {isAdmin && (
        <AddButton style={{ marginTop: "1.3rem" }}>
          <Link to={url}>Add</Link>
        </AddButton>
      )}

    </BannerContainer>
  );
}

const TextContainer = styled.div`
  h1 {
    color: #fff;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 180%; /* 4.05rem */
  }
  p {
    color: #9f9f9f;

    font-size: 1.125rem;
    font-weight: 400;
    line-height: 180%; /* 2.025rem */
  }
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 15vw;
  flex-direction: column;
  width: auto;
  height: 27.375rem;

  background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.6) 19.27%,
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
    url(${(props) => process.env.PUBLIC_URL + `/images/${props.image}`}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
`;
