import React from "react";
import { styled } from "styled-components";
import email from "../../../image/email.svg";
import DefaultProfileImage from "./DefaultProfile";

export default function ProfileCard({ member }) {
  const handleImgError = (e) => {
    e.target.src = DefaultProfileImage;
  };
  return (
    <Card>
      <Profile>
        <ProfileImg>
          <img
            src={member.imgurl || DefaultProfileImage}
            alt=""
            onError={handleImgError}
          ></img>
        </ProfileImg>

        <MemberDetail>
          {member.badge ? (
            <Badge>
              <p className="president">{member?.badge}</p>
            </Badge>
          ) : null}

          <InfoBottom>
            {member.email ? (
              <Email>
                <div className="type">
                  <img src={email} className="email" alt="email" />
                  <p>e-mail</p>
                </div>

                <p className="detail">{member?.email}</p>
              </Email>
            ) : null}

            {member.blog ? (
              <Blog>
                <div className="type">
                  <p>Blog</p>
                </div>
                <p className="detail">{member?.blog}</p>
              </Blog>
            ) : null}
            {member.career ? (
              <Career>
                <div className="type">
                  <p>Career</p>
                </div>

                <p className="detail">{member?.career}</p>
              </Career>
            ) : null}
          </InfoBottom>
        </MemberDetail>
      </Profile>

      <Name>
        <h2 className="name">{member?.name}</h2>
        <h2 className="major">{member?.major}</h2>
      </Name>
    </Card>
  );
}

const MemberDetail = styled.div`
  //display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 13rem;
  height: 17rem;
  padding: 1rem;
  opacity: 0;

  &:hover {
    flex-direction: column;
    background: rgba(0, 0, 0, 0.7);
    opacity: 1;
    transition: color 0.2s ease, background-color 0.2s ease;
  }
`;

const InfoBottom = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 1rem;
`;

const Info = styled.div`
  margin-bottom: 0.5rem;
  .type {
    display: flex;
    justify-items: center;
    justify-content: center;
    width: fit-content;
    gap: 0.3rem;
    border-bottom: 0.01px solid #fff;
    margin-bottom: 0.1rem;
  }
  .type p {
    color: #fff;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 320;
    line-height: 125%;
  }
  .type img {
    width: 1rem;
    height: 1rem;
  }
  .detail {
    margin-top: 0.2rem;
    color: #fff;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 350;
    line-height: 130%;
    width: 10rem;
    word-wrap: break-word;
  }
`;
const Blog = styled(Info)``;
const Email = styled(Info)``;
const Career = styled(Info)``;

const Badge = styled.div`
  display: inline-flex;
  position: relative;
  font-size: 7px;
  top: 0;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  border-radius: 1.875rem;
  background: #9e1f15;
  align-items: center;

  .president {
    color: #f9fafc;
    font-size: 7px;
    font-style: normal;
    font-weight: 600;
    line-height: 200%; /* 1.35rem */
  }
`;

const Card = styled.div`
  justify-items: center;
  justify-content: space-between;
  background-color: white;
`;

const Profile = styled.div`
  position: relative;
  width: 13rem;
  height: 17rem;
  margin-bottom: 1.5rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
`;

const ProfileImg = styled.div`
  border-radius: 5px;
  img {
    width: 13rem;
    height: 17rem;
    object-fit: cover;
    object-position: center bottom;
  }
`;

const Name = styled.div`
  display: flex;
  gap: 0.3rem;

  .name {
    color: #000;
    text-align: start;
    padding-bottom: 0.75rem;
    border-bottom: 0.1875rem solid #9e1f15;
    /* H2 */
    /* font-family: Noto Sans; */
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.25rem; /* 2.7rem */
  }
  .major {
    color: #9e1f15;
    margin-bottom: 0;
    /* title-간격 */
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem; /* 1.4625rem */
  }
`;
