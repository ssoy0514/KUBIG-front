import { styled } from "styled-components";

export default function PageSelect(props) {
  let orgColor;
  let memColor;
  let orgHeight;
  let memHeight;
  let orgFont;
  let memFont;

  if (props.p === "org") {
    orgColor = "#9E1F15";
    memColor = "#d9d9d9";
    orgHeight = "4px";
    memHeight = "2px";
    orgFont = "700";
    memFont = "400";
  } else {
    orgColor = "#d9d9d9";
    memColor = "#9E1F15";
    orgHeight = "2px";
    memHeight = "4px";
    orgFont = "400";
    memFont = "700";
  }

  return (
    <>
      <Wrapper>
        <PageSelectLine c={memColor} h={memHeight} fw={memFont}>
          <a href="/members">
            <h2>Members</h2>
            <div className="bar" />
          </a>
        </PageSelectLine>
        <PageSelectLine c={orgColor} h={orgHeight} fw={orgFont}>
          <a href="/organization">
            <h2>Administrators</h2>
            <div className="bar" />
          </a>
        </PageSelectLine>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 5rem;
  //padding-right: 7vw;
  justify-content: center;
`;

const PageSelectLine = styled.div`
  width: 72%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-bottom: ${(props) => props.h} solid ${(props) => props.c};

  h2 {
    color: ${(props) => props.c};
    font-size: 1.5rem;
    font-weight: ${(props) => props.fw};
    line-height: 3.2rem; /* 2.7rem */
  }
`;
