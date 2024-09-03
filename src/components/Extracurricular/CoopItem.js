import React, { useState } from "react";
import { css, styled } from "styled-components";
import DefaultProfileImage from "../Members/Members/DefaultProfile";
import { AddButton as Button } from "../common/AddButton";
import client from "../../lib/httpClient";
import { RedCircle } from "../Home/Curriculum";
import ModalPortal from "../common/ModalPortal";
import ExtraInput from "./ExtraInput";
export default function CoopItem({ item, isAdmin }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleImgError = (e) => {
    e.target.src = DefaultProfileImage;
  };
  const deleteExtraHandler = async () => {
    try {
      let deleteCheck = window.confirm("정말 삭제 하시겠습니까?");
      if (deleteCheck) {
        const res = await client.delete("/extra-curricular/" + item.id);
        window.location.reload();
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <ItemWrapper>
        {isAdmin && (
          <>
            <Button
              className="update"
              style={{ marginRight: "10px" }}
              onClick={() => setShowEditModal(true)}
            >
              수정
            </Button>
            <Button className="delete" onClick={deleteExtraHandler}>
              삭제
            </Button>
          </>
        )}

        <RedContainer>
          <RedCircle />
          <RL h={200} className="rl" />
        </RedContainer>
        <ImageWrapper>
          <img src={item.img} alt="img" onError={handleImgError} />
        </ImageWrapper>
        <ContextWrapper>
          <h1 className="title">{item.title}</h1>
          <h2 className="date">{`날짜 ${item.date}`}</h2>
          <p className="desc">{item.content}</p>
        </ContextWrapper>
      </ItemWrapper>

      {showEditModal && (
        <ModalPortal isShowing={showEditModal} setIsShowing={setShowEditModal}>
          <ExtraInput
            existingContent={item.content}
            existingDate={item.date}
            existingSelected={item.category}
            existingTitle={item.title}
            id={item.id}
          />
        </ModalPortal>
      )}
    </>
  );
}

export const ItemWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  .delete {
    position: absolute;
    right: 1rem;
    white-space: nowrap;
  }
  .update {
    position: absolute;
    right: 4.7rem;
    white-space: nowrap;
  }
`;
export const ImageWrapper = styled.div`
  img {
    width: 26.5625rem;
    height: 15.875rem;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const ContextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 57rem;
  font-style: normal;
  line-height: 180%; /* 1.8rem */
  row-gap: 0.5rem;

  h1 {
    color: #000;
    font-size: 1.125rem;
    font-weight: 700;
  }
  .date {
    color: #9e1f15;
    font-size: 0.875rem;
    font-weight: 700;
  }
  .desc {
    color: #000;
    font-size: 1rem;
    font-weight: 400;
  }
`;
export const RedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .rl {
    margin-left: 6px;
    margin-top: 5px;
  }
`;
export const RL = styled.div`
  border-left: 1px #d6d8db solid;
  height: ${(props) => props.h + "px"};
  ${(props) =>
    props.i % 2 === 0
      ? css`
          margin-left: 7px;
        `
      : css`
          margin-right: 7px;
        `}
`;
