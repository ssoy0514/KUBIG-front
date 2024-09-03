import React, { useState } from "react";
import { styled } from "styled-components";
import { AddButton as Button } from "../common/AddButton";
import DefaultProfileImage from "../Members/Members/DefaultProfile";
import client from "../../lib/httpClient";
import { ItemWrapper } from "./CoopItem";
import ModalPortal from "../common/ModalPortal";
import ExtraInput from "./ExtraInput";

export default function SpecialLecItem({ item, isAdmin }) {
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
        <ImageWrapper>
          <img src={item.img} alt="img" onError={handleImgError} />
        </ImageWrapper>
        <ContextWrapper>
          <h1 className="title">{item.title}</h1>
          <h2 className="date">{`날짜 ${item.date}`}</h2>
          <DetailBox>
            <p className="desc">{item.content}</p>
          </DetailBox>
        </ContextWrapper>
        {isAdmin && (
          <>
            <Button
              style={{ marginRight: "10px" }}
              className="update"
              onClick={() => setShowEditModal(true)}
            >
              수정
            </Button>
            <Button className="delete" onClick={deleteExtraHandler}>
              삭제
            </Button>
          </>
        )}
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

const ImageWrapper = styled.div`
  img {
    width: 22.5625rem;
    height: 23.375rem;
    object-fit: cover;
    border-radius: 5px;
  }
  margin-bottom: 2rem;
`;

const ContextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-style: normal;
  line-height: 180%; /* 1.8rem */
  row-gap: 0.5rem;
  width: 100%;
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
const DetailBox = styled.div`
  font-weight:400;
  font-size: 0.9rem;
  padding: 1.7rem;
  width: 100%;
  height: 16.9125rem;
  border-radius: 0.3125rem;
  background: #f3f3f3;
  margin-top: 2rem;
`;
