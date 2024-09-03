import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import Banner from "../../components/Extracurricular/ExtraBanner";
import axios from "../../api/axios";
import client from "../../lib/httpClient";
import ModalPortal from "../../components/common/ModalPortal";
import AwardItem from "../../components/Extracurricular/AwardItem";
import AuthContext from "../../components/Auth/AuthContext";
const SemesterOption = [1, 2];
export default function Awards() {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.role === "admin" ? true : false;
  const [AWARDS, setAWARDS] = useState([]);
  const [years, setYears] = useState([{ id: 0, year: 0, semester: 0 }]);

  const [semesterInput, setSemesterInput] = useState(1);
  const [isAddingYear, setIsAddingYear] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYearId, setSelectedYearId] = useState(-1);
  const [selectedYearString, setSelectedYearString] = useState("");
  const [yearInput, setYearInput] = useState(0);

  const semesterInputChangeHandler = (e) => {
    setSemesterInput(e.target.value);
  };
  const yearInputChangeHandler = (e) => {
    setYearInput(e.target.value);
  };
  const selectedYearChangeHandler = (e) => {
    setSelectedYearId(e.target.value);
  };

  useEffect(() => {
    getYears();
  }, []);
  useEffect(() => {
    setSelectedYearId(years[0].id);
  }, [years]);
  useEffect(() => {
    function findSelectedId(y) {
      if (y.id == selectedYearId) return true;
    }
    const yearFind = years.find(findSelectedId);
    // console.log(year);
    if (yearFind !== undefined) {
      const yearString =
        yearFind.year.toString() + "-" + yearFind.semester.toString();
      setSelectedYearString(yearString);
    }

    getAwardList();
  }, [selectedYearId]);

  async function getYears() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
          "/extra-curricular/awards/year"
      );
      const data = response.data;
      if (data.length !== 0) {
        setYears([...data]);
      }
      setIsLoading(false);
    } catch (err) {
      alert("에러가 발생하였습니다.");
    }
  }
  async function getAwardList() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
          "/extra-curricular/awards/list?year=" +
          selectedYearId
      );
      const data = response.data;
      //if (data.length !== 0) {
      setAWARDS(data);
      //}

      //setAWARDS(data);

      setIsLoading(false);
    } catch (err) {
      alert("에러가 발생하였습니다.");
    }
  }
  async function addYear() {
    try {
      const response = await client.post("/extra-curricular/awards/year", {
        year: yearInput,
        semester: semesterInput,
      });
      window.location.href = "/extra/awards";
    } catch (err) {
      alert("에러가 발생하였습니다.");
    }
  }
  return (
    <>
      <Banner isAdmin={isAdmin} id={4} />
      {!isLoading && (
        <>
          <CategoryWrapper>
            <SemesterSelect
              onChange={selectedYearChangeHandler}
              defaultValue={years[0].id}
              required
            >
              {years.map((s, i) => (
                <option value={s.id} key={i}>
                  {s.year} - {s.semester}
                </option>
              ))}
            </SemesterSelect>
            {isAdmin && (
              <Button
                style={{ whiteSpace: "nowrap", marginLeft: "1rem" }}
                onClick={() => setIsAddingYear(true)}
              >
                년도 추가
              </Button>
            )}
          </CategoryWrapper>
          <Wrapper>
            <h1 style={{ color: "#9E1F15" }}>{selectedYearString}</h1>
            {AWARDS.map((award, i) => {
              return (
                <AwardItem isAdmin={isAdmin} award={award} years={years} />
              );
            })}
          </Wrapper>
        </>
      )}

      <ModalPortal isShowing={isAddingYear} setIsShowing={setIsAddingYear}>
        <YearInputWrapper>
          <YearInput onChange={yearInputChangeHandler} />
          <SemesterSelect onChange={semesterInputChangeHandler} required>
            <option value="" disabled selected>
              학기
            </option>
            {SemesterOption.map((s, i) => (
              <option value={s} key={i}>
                {s}
              </option>
            ))}
          </SemesterSelect>
          <Button onClick={() => setIsAddingYear(false)}>취소</Button>
          <Button onClick={addYear}>저장</Button>
        </YearInputWrapper>
      </ModalPortal>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.25rem 13% 15rem 13%;
  row-gap: 2rem;
`;
const YearInputWrapper = styled.div``;
const YearInput = styled.input``;
const SemesterSelect = styled.select`
  width: 7.75rem;
  height: 2.4375rem;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  background: #f9fafc;
`;
const Button = styled.button`
  border-radius: 5px;
  background: #9e1f15;
  display: inline-flex;
  padding: 5px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;
  a {
    color: #ffffff;
    text-align: center;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
  }
`;
const CategoryWrapper = styled.div`
  width: 100%;
  padding-left: 12%;
  margin-top: 2rem;
  height: 6rem;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
`;
