import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import withAuth from "../../lib/wihAuth";
import client from "../../lib/httpClient";
import profile from "../../image/Profile.png";
import pencil from "../../image/pencil.png";
import ModalPortal from "../../components/common/ModalPortal";
import PdfInput from "../../components/Auth/PdfInput";
import ModifyPage from "./ModifyPage";
import { ModalBtn } from "../../components/common/ModalBtn";
const Mypage = () => {
  // const authCtx = useContext(AuthContext);
  const [showChangeProfileImg, setShowChangeProfileImg] = useState(false);
  const [showChangeProfileContent, setShowChangeProfileContent] =
    useState(false);

  const [imgFile, setImgFile] = useState(null);

  const [img, setImg] = useState(profile);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gen, setGen] = useState("");
  const [blog, setBlog] = useState("");
  const [major, setMajor] = useState("");
  const [career, setCareer] = useState("");
  function showChangeProfileImgHandler() {
    setShowChangeProfileImg((prev) => !prev);
  }
  function showChangeProfileContentHandler() {
    setShowChangeProfileContent((prev) => !prev);
  }
  useEffect(() => {
    if (username === "") {
      fetchInfo();
    }
  });
  async function updateProfileImgHanlder() {
    try {
      let formData = new FormData();

      formData.append("img", imgFile);
      const res = await client.put("/auth/profile-img", formData);
      window.location.href = `/auth/mypage`;
    } catch (err) {
      alert(err);
    }
  }
  async function fetchInfo() {
    try {
      const response = await client.get("/auth/mypage");
      const user = response.data.user;

      if (!user) throw Error();
      setUsername(user.username);
      setName(user.name);
      setGen(user.gen);
      setMajor(user.major);
      if (user.blog !== "") setBlog(user.blog);
      if (user.img !== "") setImg(user.img);
      setEmail(user.email);
      setCareer(user.career);
    } catch (err) {
      alert("올바르지 않은 접근입니다.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/auth/login";
    }
  }
  return (
    <>
      {!showChangeProfileContent && (
        <>
          <Wrapper>
            <Profile>
              <ImageContainer>
                <img src={img} alt="Profile" />
                <IconButton onClick={showChangeProfileImgHandler}>
                  <img src={pencil} alt="Modify" />
                </IconButton>
              </ImageContainer>

              <h2>{username}</h2>
              <Line></Line>
              <NameWrapper>
                <p className="gen">{gen}기</p>
                <p className="name">{name}</p>
              </NameWrapper>

              <p className="major">{major}</p>
            </Profile>

            <InfoWrapper>
              <h3>Email</h3>
              <Infobox>{email}</Infobox>

              <h3>Blog</h3>
              <Infobox>{blog}</Infobox>

              <h3>Career</h3>
              <Infobox>{career}</Infobox>
            </InfoWrapper>
            <Button onClick={showChangeProfileContentHandler}>수 정</Button>
          </Wrapper>

          <ModalPortal
            isShowing={showChangeProfileImg}
            setIsShowing={setShowChangeProfileImg}
          >
            <StyledModal>
              <ProfileImg>
                <h4>
                  <b>프로필 업로드</b>
                </h4>
                <p>
                  이미지를 업로드하세요.
                  <br />
                  (파일없음의 경우, 기본 프로필로 설정됩니다)
                </p>
                <div
                  style={
                    ({ margin: "1rem" },
                    { display: "flex" },
                    { flexDirection: "column" })
                  }
                >
                  <PdfInput setSelectedFile={setImgFile} />
                </div>
                <div style={({ display: "flex" }, { flexDirection: "column" })}>
                  <ModalBtnContainer>
                    <ModalBtn
                      className="btn1"
                      onClick={updateProfileImgHanlder}
                    >
                      저장
                    </ModalBtn>
                    <ModalBtn
                      className="btn2"
                      c={"#BDBDBD"}
                      onClick={showChangeProfileImgHandler}
                    >
                      취소
                    </ModalBtn>
                  </ModalBtnContainer>
                </div>
              </ProfileImg>
            </StyledModal>
          </ModalPortal>
        </>
      )}

      {showChangeProfileContent && (
        <ModifyPage
          existingBlog={blog}
          existingCareer={career}
          existingEmail={email}
          cancelEdit={showChangeProfileContentHandler}
        />
      )}
    </>
  );
};

export default withAuth(Mypage);

const StyledModal = styled.div`
  width: 30rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8rem auto 15rem auto;
  justify-items: center;
  align-items: center;
  width: 64rem;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64rem;
  height: 24rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 1px solid #dfdfdf;
  background: #fff;
  padding: 3.75rem 8.71rem 3.75rem 8.71rem;
  //box-shadow: 0 1px 30px #dfdfdf80;
  margin-top: 3rem;
  h3 {
    font-weight: 700;
    margin-bottom: 0.3rem;
    margin-right: auto;
    text-align: start;
  }
`;
const Infobox = styled.div`
  width: 47.4375rem;
  height: 2rem;
  color: #000;
  font-size: 0.875rem;
  font-weight: 400;
  margin-bottom: 1.2rem;
  margin-right: auto;
  border: none;
  border-bottom: 0.5px solid #020202;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }

  h2 {
    margin-top: 1rem;
    font-size: 1.375rem;
  }
  .name {
    color: black;
    font-size: 1rem;
    font-weight: 400;
  }
  .gen {
    color: #9e1f15;
    font-size: 1rem;
    font-weight: 700;
  }
  .major {
    color: #979797;
    font-size: 0.75rem;
    font-weight: 400;
  }
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #9e1f15;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  left: 30rem;
`;

const IconButton = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  padding: 0.2rem 0;
  background-color: #9e1f15;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;

  bottom: 1rem;
  //right: 1rem;
  img {
    width: fit-content;
    height: fit-content;
  }
`;

const Line = styled.div`
  width: 2rem;
  height: 1.5px;
  flex-shrink: 0;
  background-color: #9e1f15;
  margin-top: 0.19rem;
  margin-bottom: 0.62rem;
`;
const NameWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const ImageContainer = styled.div`
  position: relative;
`;

const ProfileImg = styled.div`
  background-color: white;
  width: max-content;
  border-radius: 6px;
  padding: 2rem;
  justify-content: center;
  p {
    font-size: 0.6rem;
    color: gray;
    line-height: 140%;
  }
`;

const ModalBtnContainer = styled.div`
  width: 100%;
  //margin-left: auto;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  & > .btn1 {
    border: 1px solid #f8f9fa;
    width: 4rem;
    font-size: small;
    border-radius: 4px;
    color: #3c4043;
    background-color: #f8f9fa;
  }
  & > .btn2 {
    border: 1px solid #f8f9fa;
    width: 4rem;
    font-size: small;
    border-radius: 4px;
    color: #3c4043;
    background-color: #f8f9fa;
  }
  & > :hover {
    filter: brightness(0.9);
  }
`;
