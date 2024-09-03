import { styled } from "styled-components";
import Step1 from "../../../image/Step1.png";
import Step2 from "../../../image/Step2.png";
import Step3 from "../../../image/Step3.png";
import Step4 from "../../../image/Step4.png";
import Step5 from "../../../image/Step5.png";
import Step6 from "../../../image/Step6.png";
import StepArrowImg from "../../../image/StepArrow.png";
import React from "react";
const Step = [
  {
    num: "01",
    firstTxt: "Application",
    SecondTxt: "Submission",
    img: Step1,
  },
  {
    num: "02",
    firstTxt: "1st",
    SecondTxt: "Acceptance",
    img: Step2,
  },
  {
    num: "03",
    firstTxt: "Interview",
    SecondTxt: "",
    img: Step3,
  },
  {
    num: "04",
    firstTxt: "Final",
    SecondTxt: "Acceptance",
    img: Step4,
  },
  {
    num: "05",
    firstTxt: "Orientation",
    SecondTxt: "",
    img: Step5,
  },
  {
    num: "06",
    firstTxt: "1st",
    SecondTxt: "Regular Session",
    img: Step6,
  },
];
export default function Process() {
  return (
    <Wrapper>
      <h1 style={{ marginBottom: "2rem" }}>Process Overview</h1>
      <StepWrapper>
        {Step.map((step, idx) => (
          <React.Fragment key={idx}>
            <StepItem>
              <StepGrayBox />
              <StepNumWrapper>{step.num}</StepNumWrapper>
              <StepTextWrapper>
                {step.firstTxt}
                <br />
                {step.SecondTxt}
              </StepTextWrapper>
              <RedLine />
              <StepImage src={step.img} />
            </StepItem>
            {idx !== 5 && (
              <StepArrowContainer key={`${idx}arrow`}>
                <StepArrow src={StepArrowImg} />
              </StepArrowContainer>
            )}
          </React.Fragment>
        ))}
      </StepWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  margin-bottom: 7rem;
`;

const StepWrapper = styled.div`
  background: #f9fafc;
  width: 100%;
  height: 16.0625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;
const StepItem = styled.div`
  position: relative;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  width: 11.25rem;
  height: 8.125rem;
`;

const StepGrayBox = styled.div`
  position: absolute;
  top: 0%;
  transform: translate(-0.31rem, -0.13rem);
  background: #f9fafc;

  color: rgba(189, 189, 189, 0.5);
  font-size: 3.75rem;
  font-weight: 300;
  line-height: 3rem;
  width: 7.5rem;
  height: 5rem;
`;
const StepNumWrapper = styled.div`
  position: absolute;
  color: rgba(189, 189, 189, 0.5);
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 300;
  top: 0%;
  left: 0%;
  transform: translate(0.62rem, -2.94rem);
`;
const StepImage = styled.img`
  position: absolute;
  width: 2rem;
  height: 2rem;
  bottom: 0%;
  left: 0%;
  transform: translate(0.63rem, -0.56rem);
`;
const StepTextWrapper = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(0.63rem, 1.06rem);
  color: #000;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  white-space: nowrap;
`;
const RedLine = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(0.63rem, 4.44rem);
  width: 2.3125rem;
  height: 3px;
  border-radius: 0.3rem 0.3rem 0.3rem 0.3rem;
  background-color: #9e1f15;
`;
const StepArrow = styled.img`
  width: 0.75rem;
  height: 1.5rem;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(0, 3.5rem);
`;
const StepArrowContainer = styled.div`
  width: 2vw;
  position: relative;
  height: 100%;
  min-width: 3.5rem;
`;
