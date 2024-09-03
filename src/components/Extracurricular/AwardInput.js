import { styled } from "styled-components";

import { useState } from "react";
import ExtraImgInput from "./ExtraImgInput";
import client from "../../lib/httpClient";
import AwardWinnerInput from "../Recruiting/Notice/NoticeTagInput";
import {
  Category,
  Content,
  Date,
  DateWrapper,
  InputContainer,
  InputUpperContainer,
  SubmitBtn,
  Title,
} from "./ExtraInput";
export default function AwardInput({
  id,
  existingTitle,
  existingSelected,
  existingContent,
  existingDate,
  SelectOption,
  existingWinners,
}) {
  const [title, setTitle] = useState(existingContent);
  const [selected, setSelected] = useState(existingSelected);
  const [content, setContent] = useState(existingTitle);
  const [selectedFile, setSelectedFile] = useState(null);
  const [date, setDate] = useState(existingDate);
  const [winners, setWinners] = useState(existingWinners);
  const [isValidDate, setIsValidDate] = useState(true);
  const dateChangeHandler = (e) => {
    const inputDate = e.target.value;
    // yyyy-mm-dd 형식 검사
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = dateRegex.test(inputDate);

    setDate(inputDate);
    setIsValidDate(isValid);
  };

  const tiltleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };
  const selectChangeHandler = (e) => {
    setSelected(e.target.value);
  };

  const isButtonDisabled =
    (id === null &&
      (title === "" ||
        selected === "" ||
        selectedFile === null ||
        content === "" ||
        date === "" ||
        winners.length === 0 ||
        isValidDate === false)) ||
    (id !== null &&
      (title === "" ||
        selected === "" ||
        content === "" ||
        date === "" ||
        winners.length === 0 ||
        isValidDate === false));

  const uploadExtraHandler = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("date", date);
      for (let i = 0; i <= winners.length - 1; i++) {
        formData.append("winners[]", winners[i]);
      }
      formData.append("yearId", selected);
      formData.append("img", selectedFile);
      const res = await client.post("/extra-curricular/awards", formData);
      window.location.href = `/extra/awards`;
    } catch (err) {
      alert(err);
    }
  };
  const updateExtraHanlder = async () => {
    console.log(selected);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("date", date);
      for (let i = 0; i <= winners.length - 1; i++) {
        formData.append("winners[]", winners[i]);
      }
      formData.append("yearId", selected);
      formData.append("img", selectedFile);
      const res = await client.put("/extra-curricular/awards/" + id, formData);
      window.location.href = `/extra/awards`;
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <InputContainer>
        <InputUpperContainer>
          <Category
            style={{ marginRight: "1rem" }}
            onChange={selectChangeHandler}
            defaultValue={selected}
            required
          >
            <option value="" disabled selected>
              수상년도
            </option>
            {SelectOption.map((s, i) => (
              <option value={s.id} key={i}>
                {s.year}-{s.semester}
              </option>
            ))}
          </Category>
          <AwardWinnerInput tags={winners} setTags={setWinners} mode={1} />

          <SubmitBtn
            disabled={isButtonDisabled}
            onClick={() => {
              if (id !== null) {
                updateExtraHanlder();
              } else {
                uploadExtraHandler();
              }
            }}
          >
            저장
          </SubmitBtn>
        </InputUpperContainer>
        <Title
          placeholder="제목을 입력하세요"
          value={title}
          onChange={tiltleChangeHandler}
        />
        <DateWrapper>
          <Date
            placeholder="날짜를 입력하세요 (yyyy-mm-dd)"
            value={date}
            onChange={dateChangeHandler}
            style={{ color: isValidDate ? "initial" : "#9e1f15" }}
          />{" "}
          {!isValidDate && <p>날짜 형식이 올바르지 않습니다. (yyyy-mm-dd)</p>}
        </DateWrapper>
        <Content
          placeholder="내용을 입력하세요"
          value={content}
          onChange={contentChangeHandler}
        />
      </InputContainer>
      <ExtraImgInput setSelectedFile={setSelectedFile} />
    </>
  );
}
