import React from "react";
import Banner from "../../components/Recruiting/RecruitingBanner";
import ForKubigNavBar from "../../components/ForKubig/ForKubigNavBar";

import { styled } from "styled-components";
import GoogleCalendar from "../../components/ForKubig/GoogleCalender";

export default function Calender() {
  return (
    <>
      <Banner imgurl={"ForKubigBanner.png"} />
      <ForKubigNavBar subMenu={2} />

      <Wrapper>
        <h1>KUBIG Calender</h1>
        <GoogleCalendar />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding-left: 14%;
  padding-right: 14%;
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  h1 {
    color: #9e1f15;
    font-size: 2rem;
    font-weight: 700;
  }
`;
