import React from "react";
import { styled } from "styled-components";

export default function AdminCard({ admin }) {
  return (
    <Wrapper>
      <CardWrapper>
        <Card>
          <InfoText>
            <p className="status">{admin?.status}</p>
            <p className="mem">
              {admin?.gen}기 {admin?.name}
            </p>
          </InfoText>
        </Card>
      </CardWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rem;
  height: fit-content;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 16rem;
  height: 3rem;
  align-items: center;
  align-content: center;
`;

const Card = styled.div`
  margin-left: 0;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 16rem;
  height: 3rem;
  border-left: solid #9e1f15 0.2rem;
  box-shadow: 0 0 15px 0 rgba(110, 110, 112, 0.3);
`;

const InfoText = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;

  justify-content: space-between;
  padding-right: 1.7rem;
  padding-left: 1.5rem;
  padding-top: 0.5rem;
  line-height: 3rem;

  .status {
    color: #000;
    /* H2 */
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    //line-height: 180%; /* 2.7rem */
  }

  .mem {
    color: #5c5f68;
    /* title-간격 */
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    //line-height: 130%; /* 1.4625rem */
  }
`;
