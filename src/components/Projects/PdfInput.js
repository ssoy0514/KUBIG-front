import { useState } from "react";
import { styled } from "styled-components";

export default function PdfInput({
  selectedFile,
  setSelectedFile,
  setThumbnailImg,
  thumbnailImg,
  existingFile,
  existingThumbnail,
}) {
  const handleFileChange = (event) => {
    if (event.target.files[0].type === "application/pdf") {
      setSelectedFile(event.target.files[0]);
    } else {
      alert("PDF 형식만 등록가능합니다.");
    }
  };
  const handleThumbnailChange = (event) => {
    if (event.target.files[0].type.startsWith("image")) {
      setThumbnailImg(event.target.files[0]);
    } else alert("이미지 파일만 등록가능합니다.");
  };
  return (
    <>
      <PdfInputWrapper style={{ height: "15vh" }}>
        {thumbnailImg
          ? thumbnailImg.name
          : existingThumbnail
          ? existingThumbnail
          : "파일을 선택해주세요."}
        <Label for="thumbnail">
          썸네일 이미지 업로드
          <InputFile id="thumbnail" type="file" onChange={handleThumbnailChange} accept="image/*" />
        </Label>
      </PdfInputWrapper>
      <PdfInputWrapper>
        {selectedFile ? selectedFile.name : existingFile ? existingFile : "파일을 선택해주세요."}
        <Label for="input-file">
          pdf 파일 업로드
          <InputFile id="input-file" type="file" onChange={handleFileChange} accept=".pdf" />
        </Label>
      </PdfInputWrapper>
    </>
  );
}

const Label = styled.label`
  width: 26.6875rem;
  height: 3.5625rem;
  background: #9e1f15;
  border: 1px solid;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PdfInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  margin-top: 10px;

  background: #fff;

  input[type="file"]::file-selector-button {
    width: ${(props) => (props.w ? props.w : "26.6875rem")};
    height: ${(props) => (props.h ? props.h : "100%")};
    background: ${(props) => (props.c ? props.c : "white")};
    border: darkgrey 1px solid;
    color: darkgrey;
    font-size: 1rem;
    border-radius: 0.2rem;
    cursor: pointer;
    &:hover {
    }
  }
  
`;
const InputFile = styled.input`
  display: none;
`;
