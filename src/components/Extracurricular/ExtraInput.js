import { styled } from "styled-components";

import { useState } from "react";
import ExtraImgInput from "./ExtraImgInput";
import client from "../../lib/httpClient";
const SelectOption = ["partnership", "session", "collaboration"];
export default function ExtraInput({
  id,
  existingTitle,
  existingSelected,
  existingContent,
  existingDate,
}) {
  const [title, setTitle] = useState(existingContent);
  const [selected, setSelected] = useState(existingSelected);
  const [content, setContent] = useState(existingTitle);
  const [selectedFile, setSelectedFile] = useState(null);
  const [date, setDate] = useState(existingDate);

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
        isValidDate === false)) ||
    (id !== null &&
      (title === "" ||
        selected === "" ||
        content === "" ||
        date === "" ||
        isValidDate === false));

  const uploadExtraHandler = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("category", selected);
      formData.append("content", content);
      formData.append("date", date);
      formData.append("img", selectedFile);
      const res = await client.post("/extra-curricular", formData);
      window.location.href = `/extra/${selected}`;
    } catch (err) {
      alert(err);
    }
  };
  const updateExtraHanlder = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("category", selected);
      formData.append("content", content);
      formData.append("date", date);
      formData.append("img", selectedFile);
      const res = await client.put("/extra-curricular/" + id, formData);
      window.location.href = `/extra/${selected}`;
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <InputContainer>
        <InputUpperContainer>
          <Category
            onChange={selectChangeHandler}
            defaultValue={selected}
            required
          >
            <option value="" disabled selected>
              카테고리
            </option>
            {SelectOption.map((s, i) => (
              <option value={s} key={i}>
                {s}
              </option>
            ))}
          </Category>
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
export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  background: #fff;
  align-items: center;
`;
export const InputUpperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1% 0.8rem 1%;
  border-bottom: 1px solid #d6d8db;
`;

export const SubmitBtn = styled.button`
  margin-left: auto;
  border-radius: 5px;
  background: #9e1f15;
  padding: 5px 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  &:disabled {
    background: gray;
  }
`;
export const Category = styled.select`
  width: 15%;
  height: 2.5rem;
  border-radius: 5px;
  border: 1px solid #d6d8db;
  background: #eff2f3;
  color: #979797;
  font-weight: 500;
`;
export const Title = styled.input`
  border: none;
  padding: 1% 0;
  width: 98%;

  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  border-bottom: 1px solid #d6d8db;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`;

export const Content = styled.input`
  border: none;
  padding: 4% 0;
  width: 98%;
  height: 30vh;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`;
export const Date = styled.input`
  border: none;
  width: 100%;
  padding: 2% 0;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`;
export const DateWrapper = styled.div`
  border-bottom: 1px solid #d6d8db;
  padding: 2% 0;
  width: 98%;
  p {
    font-size: 0.5rem;
    color: #9e1f15;
  }
`;
