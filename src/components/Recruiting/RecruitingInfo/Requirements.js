import { styled } from "styled-components";
import Check from "../../../image/Check.png";
export default function Requirements() {
  return (
    <Wrapper>
      <h1>Requirements</h1>
      <RequirementsItemWrapper>
        <RequirementsItem>
          <CheckImg src={Check} />
          <h3>
            방학을 포함해 1년간 활동이 가능한 고려대학생 (전공 및 학부/대학원
            무관)
          </h3>
        </RequirementsItem>
        <RequirementsItem>
          <CheckImg src={Check} />
          <h3>매주 목요일 저녁 정규 세션 포함 주 2회 이상 참여가 가능한 분</h3>
        </RequirementsItem>
        <RequirementsItem>
          <CheckImg src={Check} />
          <h3>데이터 분석 / 머신러닝 / 딥러닝 / AI에 관심이 있으신 분</h3>
        </RequirementsItem>
      </RequirementsItemWrapper>
      <ApplyBtn
        onClick={() => window.open("https://forms.gle/5WDtCsEpFfYKyqPHA")}
      >
        <h3>APPLY</h3>
      </ApplyBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.75rem;
  padding-bottom: 4.69rem;
  margin-bottom: 10rem;
`;
const RequirementsItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1.81rem;
`;
const RequirementsItem = styled.div`
  border-radius: 0.3125rem;
  background: #f3f3f3;
  width: 46.375rem;
  height: 2.625rem;
  display: flex;
  align-items: center;
`;
const CheckImg = styled.img`
  width: 1.375rem;
  height: 0.875rem;
  margin-left: 1.19rem;
  margin-right: 3.63rem;
`;

const ApplyBtn = styled.button`
  display: flex;
  width: 9.0625rem;
  height: 3rem;
  padding: 0.3125rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 2rem;
  margin-top: 2.56rem;
  //border: 1px #9e1f15 solid;
  background-color: #A8352C;

  h3 {
    font-size: 1.125rem;
    color: #fff;
  }

  &:hover {
    background-color: #9e1f15;
  }
`;
