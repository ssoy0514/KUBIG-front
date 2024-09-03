import { useState } from "react";
import { styled } from "styled-components";

export default function PdfInput({ setSelectedFile }) {
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <PdfInputWrapper>
      <InputFile id="input-file" type="file" onChange={handleFileChange} />
    </PdfInputWrapper>
  );
}
const PdfInputWrapper = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  margin-top: 10px;

  background: #fff;
  gap: 5rem;

  input[type="file"]::file-selector-button {
    width: 8rem;
    height: ${(props) => (props.h ? props.h : "100%")};
    margin-left: 12px;
    border-radius: ${(props) => (props.br ? props.br + "rem" : "0.6rem")};

    border: 1px solid #dddddd;
    //width: 4rem;
    font-size: medium;
    border-radius: 4px;
    color: #3c4043;
    background-color: #dddddd;

    cursor: pointer;
    &:hover {
      filter: brightness(0.8);
    }
  }
`;
const InputFile = styled.input`
  /* display: none; */
  ///width: 15rem;
  height: 3.5625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //text-overflow: auto;
`;
