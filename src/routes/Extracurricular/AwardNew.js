import { NewWrapper } from "../../components/Studies/StudyEdit";
import AwardInput from "../../components/Extracurricular/AwardInput";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AwardNew() {
  const [years, setYears] = useState([{ id: 0, year: 0, semester: 0 }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getYears();
  }, []);

  async function getYears() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
          "/extra-curricular/awards/year"
      );
      const data = response.data;
      setYears([...data]);
      setIsLoading(false);
    } catch (err) {
      alert("에러가 발생하였습니다.");
    }
  }
  return (
    <NewWrapper>
      {isLoading && <h1>수상 년도 불러오는 중</h1>}
      {!isLoading && (
        <AwardInput
          existingContent={""}
          existingDate={""}
          existingSelected={""}
          existingTitle={""}
          id={null}
          SelectOption={years}
          existingWinners={[]}
        />
      )}
    </NewWrapper>
  );
}
