import React, { useState } from "react";
import { css, styled } from "styled-components";
import DefaultProfileImage from "../Members/Members/DefaultProfile";
import { AddButton as Button } from "../common/AddButton";
import client from "../../lib/httpClient";
import { RedCircle } from "../Home/Curriculum";
import ModalPortal from "../common/ModalPortal";
import AwardInput from "./AwardInput";
import { ImageWrapper, ItemWrapper, RL, RedContainer } from "./CoopItem";
export default function AwardItem({ award, years, isAdmin }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleImgError = (e) => {
    e.target.src = DefaultProfileImage;
  };
  const deleteExtraHandler = async () => {
    try {
      let deleteCheck = window.confirm("정말 삭제 하시겠습니까?");
      if (deleteCheck) {
        const res = await client.delete("/extra-curricular/awards/" + award.id);
        window.location.reload();
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <ItemWrapper>
        <RedContainer>
          <RedCircle />
          <RL h={200} className="rl" />
        </RedContainer>
        <ImageWrapper>
          <img src={award.img} alt="img" onError={handleImgError} />
        </ImageWrapper>
        <ContetWrapper>
          <h4 className="award-title">{award.title}</h4>
          <div className="winner-wrapper">
            {award.winners.map((winner, i) => {
              return (
                <span key={i} className="winner">
                  {winner}
                </span>
              );
            })}
          </div>
          <div className="comment-box">
            <span className="comment">
              Comment
              <br />
            </span>
            {award.content}
          </div>
          <h5 className="date">{award.date}</h5>
        </ContetWrapper>
        {isAdmin && (
          <>
            {" "}
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
          <ModalContainer>
            <AwardInput
              existingContent={award.content}
              existingDate={award.date}
              existingSelected={award.year.id}
              existingTitle={award.title}
              id={award.id}
              SelectOption={years}
              existingWinners={award.winners}
            />
          </ModalContainer>
        </ModalPortal>
      )}
    </>
  );
}
const ContetWrapper = styled.div`
  width: 100%;
  position: relative;
  .comment-box {
    width: 100%;
    height: 9.6875rem;
    overflow-y: scroll;
    border-radius: 0.3125rem;
    background: #f3f3f3;
    margin-top: 0.5rem;
    padding-top: 0.6rem;
    padding-left: 1.25rem;
    font-size: 0.875rem;
    font-weight: 400;
  }
  .comment {
    font-size: 0.75rem;
    color: #9e1f15;
    border-bottom: 1px solid #9e1f15;
    font-weight: 300;
  }
  .award-title {
    font-weight: 700;
  }
  .winner {
    color: #404040;
    margin-right: 0.7rem;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .winner-wrapper {
    margin-top: 0.6rem;
    margin-left: 0.1rem;
  }
  .date {
    font-size: 0.75rem;
    color: #9fa0a7;
    font-weight: 400;
    margin-top: auto;
  }
`;
const ModalContainer = styled.div`
  background: white;
  border-radius: 6px;
  width: 80rem;
`;
