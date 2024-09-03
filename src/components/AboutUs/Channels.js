import { styled } from "styled-components";
import LinkArrow from "../../image/LinkArrow.svg";
import { displayName } from "react-quill";

const ChannelsData = [
  {
    name: "Tistory",
    description:
      "지난해부터 KUBIG은 방학 기간을 포함해 학기 동안 진행한 여러 활동을 Tistory에 기록하기 시작했습니다. 기존에 가지고 있던 GitHub 이외에 간편하게 글 형식으로 보기 편한 플랫폼이 필요하다는 판단에서 활동 블로그를 개설한 것입니다.\r\n방학 세션의 개요, 방학 세션 막바지에 진행한 미니 프로젝트, 학기 중에 진행한 스터디, 프로젝트 등을 확인할 수 있습니다. 이를 참조하여 새로운 프로젝트를 기획할 수도 있고 새로 들어올 후배 기수들도 지금까지 해온 활동들로부터 여러 방면에서 도움을 받을 수 있습니다.",
    imgUrl: "TistoryImage.png",
    link: [
      {
        name: "2022년 1학기 활동블로그",
        url: "https://kubig-2022-1.tistory.com/",
      },
      {
        name: "2022년 2학기 활동블로그",
        url: "https://kubig-2022-2.tistory.com/",
      },
      {
        name: "2023년 1학기 활동블로그",
        url: "https://kubig-2023-1.tistory.com/",
      },
    ],
  },
  {
    name: "GitHub",
    description:
      "KUBIG은 GitHub를 통해 프로젝트 및 스터디에서 진행한 내용을 정리합니다. 학기별로 Repository를 만들어 관리하며, 모든 스터디와 프로젝트에서 사용된 코드를 보기 쉽게 아카이빙합니다. 실제로 프로젝트를 하는 과정에서 KUBIG을 거쳐 간 선배들의 코드는 다른 학회원들에게 아주 유용한 참고서가 됩니다.\r\n 따라서 기존 학회원을 비롯하여 새로 들어올 후배 기수들도 지금껏 쌓아온 KUBIG의 데이터베이스를 쉽게 활용할 수 있도록 GitHub를 열심히 관리하고 있습니다. 학회원이 아닌 분들도 언제든지 하단의 링크에서 KUBIG이 그동안 해왔던 프로젝트들을 확인하실 수 있습니다.",
    imgUrl: "GithubImage.png",
    link: [{ name: "GitHub", url: "https://github.com/KU-BIG" }],
  },
  {
    name: "SNS",
    description:
      "현재 KUBIG은 Instagram에 공식 계정을 개설하고 이를 활용하여 KUBIG의 다양한 활동 소식을 전달하고 있습니다. 한 학기 단위로 진행되는 KUBIG의 전반적인 커리큘럼에 대한 소개부터 실제 세션이 진행되는 모습과 스터디 및 최종 프로젝트의 결과물까지, 카드 뉴스 및 사진의 형태로 위 내용을 담은 게시물들을 꾸준히 업로드하고 있습니다.\r\n이뿐만 아니라 KUBIG의 신입 기수 모집 소식, KUBIG 학회원들 간의 친목 행사, 현직에서 일하고 계신 선배와의 만남 및 인터뷰 내용 등등, 학술 세션 외에도 다채롭게 진행되고 있는 KUBIG의 여러 활동 콘텐츠들에 대해서도 SNS를 통해 꾸준히 소개하고 있습니다. 또한 이러한 KUBIG의 다양한 활동에 대한 질의·응답, 타 학회 및 단체와의 소통 또한 본 SNS계정을 통해 활발히 이뤄지고 있습니다. 이러한 SNS상에서의 활동 내용을 본 계정을 통해 확인하실 수 있고 링크는 다음과 같습니다.",
    imgUrl: "InstagramImage.png",
    link: [
      { name: "Instagram", url: "https://www.instagram.com/kubig.official/" },
    ],
  },
];

export default function Channels() {
  const renderLeft = (c, i) => {
    return (
      <ItemWrapper key={i}>
        <ChannelContainer>
          <ChannelTextContainer>
            <h2>{c.name}</h2>
            <>
              {c.description.split("\r\n").map((item) => (
                <>
                  <p key={i}>{item}</p>
                  <br />
                </>
              ))}
            </>
            <LinkContainer>
              {c.link.map((l, i) => (
                <LinkBtn key={i} onClick={() => window.open(l.url)}>
                  {l.name}
                  <img
                    style={{ marginLeft: "auto" }}
                    src={LinkArrow}
                    alt="LinkArrow"
                  ></img>
                </LinkBtn>
              ))}
            </LinkContainer>
          </ChannelTextContainer>
          <ImageContainer>
            <img
              src={process.env.PUBLIC_URL + `/images/${c.imgUrl}`}
              alt="img"
            />
          </ImageContainer>
        </ChannelContainer>
      </ItemWrapper>
    );
  };
  const renderRight = (c, i) => {
    return (
      <ItemWrapper key={i}>
        <ChannelContainer>
          <ImageContainer>
            <img
              src={process.env.PUBLIC_URL + `/images/${c.imgUrl}`}
              alt="img"
            />
          </ImageContainer>

          <ChannelTextContainer>
            <h2>{c.name}</h2>
            <>
              {c.description.split("\r\n").map((item) => (
                <>
                  <p key={i}>{item}</p>
                  <br />
                </>
              ))}
            </>
            <LinkContainer>
              {c.link.map((l, i) => (
                <LinkBtn key={i} onClick={() => window.open(l.url)}>
                  {l.name}
                  <img
                    style={{ marginLeft: "auto" }}
                    src={LinkArrow}
                    alt="LinkArrow"
                  ></img>
                </LinkBtn>
              ))}
            </LinkContainer>
          </ChannelTextContainer>
        </ChannelContainer>
      </ItemWrapper>
    );
  };
  return (
    <Wrapper>
      <TextContainer>
        <h1>Online Channels</h1>
        <h2>다양한 온라인 채널을 통해 KUBIG의 활동을 살펴보세요.</h2>
      </TextContainer>

      <AllChannelContainer>
        {ChannelsData.map((c, i) => {
          if (i % 2 === 0) {
            return renderLeft(c, i);
          } else {
            return renderRight(c, i);
          }
        })}
      </AllChannelContainer>
    </Wrapper>
  );
}

const ItemWrapper = styled.div`
  width: 100%;
  //justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 8rem;
  padding-bottom: 8rem;
  background: #f9fafc;
  height: max-content;

  h1 {
    margin: 0;
    color: #9e1f15;
    font-size: 2rem;
    font-weight: 700;
  }
  h2 {
    margin-bottom: 1rem;
  }
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div``;

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 3vh;
  gap: 5%;
  p {
    color: #000;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 180%;
  }
`;

const AllChannelContainer = styled.div`
  //width: 100%;
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  gap: 5%;
`;

const ChannelTextContainer = styled.div`
  display: inline-block;
  width: 50%; 
`;

const ImageContainer = styled.div`
  display: inline-block;
  width: 50%;
  border-radius: 6px;
  

  img {
    border-radius: 6px;
    width: 100%;
    filter: brightness(0.8);
    box-shadow: 0 4px 16px rgb(0,0,0,0.2);
  }
`;

const LinkContainer = styled.div`
  float: right;
`;

const LinkBtn = styled.button`
  padding: 0.1875rem 0.8125rem;
  border-radius: 1.875rem;
  background: #9e1f15;
  color: #f9fafc;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 180%;
  display: flex;
  align-items: center;
  gap: 0.26rem;
  margin-bottom: 0.6875rem;
  margin-left:auto;
`;
