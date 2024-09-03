import { styled } from "styled-components";

export default function ExtraImgInput({ setSelectedFile }) {
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <ImgInputWrapper>
      <InputFile id="input-file" type="file" onChange={handleFileChange} />
    </ImgInputWrapper>
  );
}
const ImgInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  /* border-radius: 0.3125rem; */
  border: 1px solid #d6d8db;
  margin-top: 10px;

  background: #fff;
  input[type="file"]::file-selector-button {
    width: 26.6875rem;
    height: 100%;
    background: #9e1f15;
    border: 1px solid;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
    }
  }
`;
const InputFile = styled.input`
  /* display: none; */
  width: 35rem;
  height: 3.5625rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
