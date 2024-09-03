import { useState } from "react";
import { styled } from "styled-components";
import client from "../../lib/httpClient";

function parseEmail(email) {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    const [emailFront, emailBack] = email.split("@");
    return {
      emailFront: emailFront,
      emailBack: emailBack,
    };
  } else {
    return null; // "@"가 없는 경우 처리
  }
}

const ModifyPage = ({
  existingEmail,
  existingBlog,
  existingCareer,
  cancelEdit,
}) => {
  const parsedEmail = parseEmail(existingEmail);
  const [blog, setBlog] = useState(existingBlog);
  const [career, setCareer] = useState(existingCareer);
  const [emailFront, setEmailFront] = useState(parsedEmail.emailFront); // Initialize email front part state
  const [emailBack, setEmailBack] = useState(parsedEmail.emailBack); // Initialize email back part state
  const updateProfileContentHandler = async () => {
    try {
      await client.put(`/auth/profile`, {
        blog: blog,
        career: career,
        email: `${emailFront}@${emailBack}`,
      });
      window.location.href = "/auth/mypage";
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      (
      <Wrapper>
        <FormStyled>
          <h2>개인 정보</h2>

          <h3>이메일</h3>
          <InputGroup>
            <StyledInput w={"45%"}>
              <InputField
                type="text"
                id="emailFront"
                placeholder="example"
                onChange={(e) => setEmailFront(e.target.value)}
                value={emailFront}
                //ref={userRef}
                required
              />
            </StyledInput>

            <span>@</span>
            <StyledInput w={"45%"}>
              <InputField
                type="text"
                id="emailBack"
                placeholder="korea.ac.kr"
                onChange={(e) => setEmailBack(e.target.value)}
                value={emailBack}
                //ref={userRef}
                required
              />
            </StyledInput>
          </InputGroup>

          <h3>블로그</h3>
          <StyledInput>
            <InputField
              type="text"
              placeholder="주소를 입력하세요.(선택사항)"
              onChange={(e) => setBlog(e.target.value)}
              value={blog}
            />
          </StyledInput>
          <h3>직장</h3>
          <StyledInput>
            <InputField
              type="text"
              placeholder="직장를 입력하세요.(선택사항)"
              onChange={(e) => setCareer(e.target.value)}
              value={career}
            />
          </StyledInput>
        </FormStyled>
        <BtnContainer>
          <Button
            w={6}
            c={"#9e1f15"}
            fc={"#fff"}
            type="submit"
            onClick={updateProfileContentHandler}
          >
            수정 완료
          </Button>
          <Button fc={"#fff"} onClick={cancelEdit}>
            취소
          </Button>
        </BtnContainer>
      </Wrapper>
      )
    </>
  );
};

export default ModifyPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;

  border-radius: 1rem;
  //border: 1px solid #dadcdf;
  background: #fff;
  margin: 0 auto 20rem auto;
  padding: 3rem 3rem 2.5rem 3rem;

  //box-shadow: 0px 0px 20px 0px rgba(214, 216, 219, 0.5);

  color: #020202;

  h1 {
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.0625rem;
  }
  h2 {
    font-size: 1.625rem;
    font-weight: 700;
    margin-top: 3rem;
  }
  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-top: 1.87rem;
    margin-bottom: 0.5rem;
  }
`;

const FormStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
  //margin-bottom: 3rem;
  margin: 3rem auto 3rem auto;
  width: 80%;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  width: 100%;
  span {
    line-height: 3rem;
  }
  .idgroup {
    align-items: center;
  }
`;

const StyledInput = styled.div`
  border-radius: 0.6rem;
  border: 1.43px solid #e5e5e5;
  background: #f8f8f8;
  width: ${(props) => (props.w ? props.w : "auto")};
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;

  img {
    position: relative;
    top: 0.3rem;
    left: 1.2rem;
  }

  select:focus,
  input:focus {
    outline: 0;
  }
  .correct {
    opacity: 0.1;
    margin-left: 0.25rem;
  }
  > .valid {
    opacity: 0.5;
    margin-left: 0.25rem;
  }
  > .invalid {
    color: #ff6969;
    margin-left: 0.25rem;
  }
  > .hide {
    display: none;
  }
`;

const InputField = styled.input`
  width: 90%;
  height: 90%;
  border-color: transparent;
  background-color: transparent;

  color: #020202;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
  padding-top: 0.3rem;
  &::placeholder {
    color: #bdbdbd;
    font-size: 1rem;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const Button = styled.button`
  width: ${(props) => (props.w ? props.w + "rem" : "4rem")};
  height: ${(props) => (props.h ? props.h + "rem" : "3rem")};
  border-radius: 0.625rem;
  background: ${(props) => (props.c ? props.c : "#bdbdbd80")};
  color: ${(props) => (props.fc ? props.fc : "#bdbdbd80")};
  text-align: center;
  font-size: ${(props) => (props.fs ? props.fs + "rem" : "1rem;")};
  //border: 2px lightgray solid;
  font-weight: 400;
  margin: auto 1rem auto;
  cursor: pointer;
  //border: 0;

  &:hover {
    filter: brightness(0.9);
  }
`;
const BtnContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
