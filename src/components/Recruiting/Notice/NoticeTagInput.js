import { useState } from "react";
import { styled } from "styled-components";
import { AddButton } from "../../common/AddButton";

export default function NoticeTagInput({ tags, setTags, mode }) {
  const [inputValue, setInputValue] = useState(""); // 입력된 문자열
  let placeHolder = "태그를 입력하세요";
  if (mode === 1) placeHolder = "수상자 입력 (nn기 홍길동)";
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddString = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue(""); // 입력 필드 초기화
    }
  };

  const handleRemoveString = (index) => {
    const newArray = [...tags];
    newArray.splice(index, 1);
    setTags(newArray);
  };

  return (
    <TagInputWrapper>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeHolder}
        />
        <AddButton onClick={handleAddString}>추가</AddButton>
      </div>
      <ul>
        {tags.map((str, index) => (
          <li key={index}>
            #{str}
            <DeleteButton onClick={() => handleRemoveString(index)}>
              삭제
            </DeleteButton>
          </li>
        ))}
      </ul>
    </TagInputWrapper>
  );
}
const TagInputWrapper = styled.div`
  display: flex;
  align-items: center;
  button {
    white-space: nowrap;
    margin-left: 0.8rem;
  }
  li {
    float: left;
    margin-left: 1rem;
  }
`;

const DeleteButton = styled(AddButton)`
  background: #eaeaea;
  border-radius: 14px;
  width: fit-content;
  font-size: 0.5rem;
  color: darkgray;
  &:hover {
    background: #eaeaea;
  }
`;
