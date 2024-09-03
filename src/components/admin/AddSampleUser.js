import { useState } from "react";
import { Button } from "../Auth/CommonComponents";
import styled from "styled-components";
import axios from "axios";
import optionsData from "../Auth/optionsData";

function AddSampleUser() {
  const [newGen, setNewGen] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [career, setCareer] = useState("");
  const [blog, setBlog] = useState("");

  const [err, setErr] = useState(false);

  const [thumbnailImg, setThumbnailImg] = useState("");

  const handleThumbnailChange = (event) => {
    if (event.target.files[0].type.startsWith("image")) {
      setThumbnailImg(event.target.files[0]);
    } else alert("이미지 파일만 등록가능합니다.");
  };
  const postImg = async () => {
    if (thumbnailImg) {
      const thumbnailFormData = new FormData();
      thumbnailFormData.append("file", thumbnailImg);

      const thumbnailResponse = await axios.post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/s3/admin",
        thumbnailFormData
      );
      return thumbnailResponse.data;
    }
  };
  const handleCheck = (gen) => {
    postImg().then((url) => {
      axios
        .post(process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/user/add", {
          gen: newGen,
          name: name,
          studentId: id || undefined,
          email: email || undefined,
          major: major,
          career: career || undefined,
          blog: blog || undefined,
          imgUrl: url || undefined,
        })
        .then((res) => {
          setErr(true);
        })
        .catch((err) => {
          alert("필수 정보: 이름, 기수, 전공");
        });
    });
  };

  return (
    <Container>
      <h3
        style={{
          color: "darkred",
          fontSize: "medium",
          fontWeight: "bold",
          marginTop: 70,
          marginBottom: 10,
        }}
      >
        Sample user
      </h3>
      <h5>샘플 유저 등록</h5>
      <p style={{ color: "gray", fontSize: "small" }}>
        로그인은 불가능하지만 멤버 목록에 추가됩니다.
        <br /> (회원가입을 하지 않지만, member 페이지에 추가하고 싶은 경우
        사용하면 됩니다. ex. OB 등록) <br />
        교수님 학번 및 기수는 0으로 세팅. 웬만하면 회원가입하는 쪽으로 해주세용
      </p>

      <p style={{ color: "gray", fontSize: "small", marginTop: 10 }}>
        프로필에 표시할 정보 입력
      </p>
      <div style={{ display: "flex" }}>
        <input
          style={{ width: "100px" }}
          placeholder="홍길동"
          onChange={(e) => {
            setName(e.target.value);
            setErr(false);
          }}
        />
      </div>
      <div style={{ display: "flex", marginTop: 5 }}>
        <input
          style={{ width: "100px" }}
          placeholder="기수 (15, 16,)"
          onChange={(e) => {
            setNewGen(e.target.value);
            setErr(false);
          }}
        />
        <input
          style={{ width: "100px", marginLeft: 5 }}
          placeholder="학번(19, 20, 21..)"
          onChange={(e) => {
            setId(e.target.value);
            setErr(false);
          }}
        />

        <select
          id="department"
          placeholder="소속학과를 선택하세요."
          onChange={(e) => setMajor(e.target.value)} // Update department state
          value={major}
          style={{ width: "200px", marginLeft: 5 }}
          required
          //ref={userRef}
        >
          <option value="" disabled>
            소속학과를 선택하세요.
          </option>
          {optionsData.DEPARTMENT_OPTIONS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <input
        style={{ width: "200px", marginTop: 5 }}
        placeholder="이메일 입력"
        onChange={(e) => {
          setEmail(e.target.value);
          setErr(false);
        }}
      />

      <input
        style={{ width: "200px", marginTop: 5 }}
        placeholder="career 입력 (선택)"
        onChange={(e) => {
          setCareer(e.target.value);
          setErr(false);
        }}
      />
      <input
        style={{ width: "200px", marginTop: 5 }}
        placeholder="blog 입력 (선택)"
        onChange={(e) => {
          setBlog(e.target.value);
          setErr(false);
        }}
      />
      <p style={{ color: "gray", fontSize: "small", marginTop: 10 }}>
        {thumbnailImg ? thumbnailImg.name : "프로필 이미지 업로드 (선택)"}
      </p>
      <Label for="thumbnail">
        이미지 업로드
        <InputFile
          id="thumbnail"
          type="file"
          onChange={handleThumbnailChange}
          accept="image/*"
        />
      </Label>

      <Button
        w={3}
        h={2}
        style={{ marginTop: 5, hover: "pointer" }}
        onClick={() => {
          handleCheck(newGen);
        }}
      >
        확인
      </Button>

      {err && <p>변경 완료되었습니다.</p>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  justify-content: center;
  width: 100%;
  height: 30rem;
`;

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
const InputFile = styled.input`
  display: none;
`;
export default AddSampleUser;
