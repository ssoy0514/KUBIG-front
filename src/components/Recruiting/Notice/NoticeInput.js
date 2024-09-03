import { styled } from "styled-components";

import { useState } from "react";
import { EditorWrapper, NewWrapper } from "../../Studies/StudyEdit";
import QuillEditor from "../../Studies/QuillEditor";
import client from "../../../lib/httpClient";
import NoticeTagInput from "./NoticeTagInput";

const SelectOption = [
  { value: "over", name: "마감" },
  { value: "regular", name: "상시모집" },
  { value: "announcement", name: "공고 중" },
];

export default function NoticeInput({
  existingHtmlStr,
  existingTitle,
  id,
  mode,
  exisistingDeadline,
  existingTags,
}) {
  const [htmlStr, setHtmlStr] = useState(existingHtmlStr);
  const [title, setTitle] = useState(existingTitle);
  const [thumbnailUrl, setThumbnailUrl] = useState(""); //필요 없지만 그냥 넣어줌
  const [deadline, setDeadline] = useState(exisistingDeadline);
  const [tags, setTags] = useState(existingTags);
  const selectChangeHandler = (e) => {
    setDeadline(e.target.value);
  };
  const tiltleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  let url = "/recruiting/notice";
  let redirectUrl = "/recruiting/notice";
  if (mode === 1) {
    url = "/for-kubig/notice";
    redirectUrl = "/for-kubig/notice";
  } else if (mode === 2) {
    url = "/for-kubig/intern-notice";
    redirectUrl = "/for-kubig/intern-notice";
  }

  const uploadNoticeHandler = async () => {
    if (mode === 2) {
      try {
        const res = await client.post(url, {
          title: title,
          content: htmlStr,
          tags: tags,
          deadline: deadline,
        });
        window.location.href = redirectUrl;
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const res = await client.post(url, {
          title: title,
          content: htmlStr,
        });
        window.location.href = redirectUrl;
      } catch (err) {
        alert(err);
      }
    }
  };
  const updateNoticeHandler = async () => {
    if (mode === 2) {
      try {
        const res = await client.put(`${url}/${id}`, {
          title: title,
          content: htmlStr,
          tags: tags,
          deadline: deadline,
        });
        window.location.href = redirectUrl;
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const res = await client.put(`${url}/${id}`, {
          title: title,
          content: htmlStr,
        });
        window.location.href = redirectUrl;
      } catch (err) {
        alert(err);
      }
    }
  };

  const isButtonDisabled =
    (mode === 2 &&
      (title === "" ||
        htmlStr === null ||
        htmlStr === "" ||
        deadline === "")) ||
    (mode !== 2 && (title === "" || htmlStr === null || htmlStr === ""));

  return (
    <NewWrapper>
      <InputContainer>
        <InputUpperContainer>
          <Title
            placeholder="제목을 입력하세요"
            value={title}
            onChange={tiltleChangeHandler}
          />
          <SubmitBtn
            disabled={isButtonDisabled}
            onClick={() => {
              if (id === null) {
                uploadNoticeHandler();
              } else {
                updateNoticeHandler();
              }
            }}
          >
            저장
          </SubmitBtn>
        </InputUpperContainer>
      </InputContainer>
      {mode === 2 && (
        <DeadlineAndTagContainer>
          <Category
            onChange={selectChangeHandler}
            required
            defaultValue={deadline}
          >
            <option value="" disabled selected>
              카테고리
            </option>
            {SelectOption.map((s, i) => (
              <option value={s.value} key={i}>
                {s.name}
              </option>
            ))}
          </Category>
          <NoticeTagInput tags={tags} setTags={setTags} mode={0} />
        </DeadlineAndTagContainer>
      )}
      <EditorWrapper>
        <QuillEditor
          htmlStr={htmlStr}
          setHtmlStr={setHtmlStr}
          thumbnailUrl={thumbnailUrl}
          setThumbnailUrl={setThumbnailUrl}
        ></QuillEditor>
      </EditorWrapper>
    </NewWrapper>
  );
}
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  background: #fff;
  align-items: center;
`;
const InputUpperContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1% 0.8rem 1%;
  border-bottom: 1px solid #d6d8db;
`;

const SubmitBtn = styled.button`
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
const Title = styled.input`
  border: none;
  padding: 1% 0;
  width: 90%;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`;
const Category = styled.select`
  width: 15%;
  height: 2.5rem;
  border-radius: 5px;
  border: 1px solid #d6d8db;
  background: #eff2f3;
  color: #979797;
  font-weight: 500;
`;
const DeadlineAndTagContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.8rem 1% 0.8rem 1%;
  border: 1px solid #d6d8db;
  border-radius: 2px;
  gap: 1rem;
`;
