import React from "react";
import Process from "../../components/Recruiting/RecruitingInfo/Process";
import Requirements from "../../components/Recruiting/RecruitingInfo/Requirements";
import RecruitingBanner from "../../components/Recruiting/RecruitingBanner";
import RecruitingNavBar from "../../components/Recruiting/RecruitingNavBar";

export default function RecruitingInfo() {
  return (
    <>
      <RecruitingBanner imgurl={"RecruitingImage.png"} />
      <RecruitingNavBar subMenu={0} />
      <Process />
      <Requirements />
    </>
  );
}
