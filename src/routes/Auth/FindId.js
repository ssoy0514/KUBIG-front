import React, { useRef, useState, useEffect } from "react";
import Step1 from "../../components/Auth/FindId/FindId1";
import Step2 from "../../components/Auth/FindId/FindId2";
import Step3 from "../../components/Auth/FindId/FindId3";
import axios from "../../api/axios";
const RESET_URL = "/auth/resetpw";
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function FindId() {
  const userRef = useRef();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [findResult, setFindresult] = useState([]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setValidEmail(EMAIL_REGEX.test(newEmail));
  };

  const handleInputCodeChange = (e) => {
    const newInputCode = e.target.value;
    setInputCode(newInputCode);
  };
  const sendMail = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/mail/send?to=" + email
      );
      if (res.status !== 201) {
        setErrMsg("Failed");
      } else {
        setStep(2);
        if (step === 2) alert("인증번호가 발송되었습니다.");
      }
    } catch (err) {
      setErrMsg(err);
    }
  };
  const handleSubmitStep1 = (e) => {
    e.preventDefault();

    if (!validEmail) {
      return;
    }
    sendMail();
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
          "/mail/verify?email=" +
          email +
          "&code=" +
          inputCode
      );
      const { data } = response;
      setSuccess(data.result);
      if (data.result) {
        setFindresult(data.data);
      }
      setStep(3);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Failed");
      }
    }
  };
  useEffect(() => {
    if (errMsg) alert(errMsg);
  }, [errMsg]);

  return (
    <>
      {step === 1 && (
        <Step1
          email={email}
          validEmail={validEmail}
          userRef={userRef}
          handleSubmitStep1={handleSubmitStep1}
          handleEmailChange={handleEmailChange}
        />
      )}
      {step === 2 && (
        <Step2
          email={email}
          userRef={userRef}
          handleSubmitStep2={handleSubmitStep2}
          handleEmailChange={handleEmailChange}
          inputCode={inputCode}
          handleInputCodeChange={handleInputCodeChange}
          validEmail={validEmail} // validEmail 값을 전달
          sendMail={sendMail}
        />
      )}
      {step === 3 && <Step3 success={success} findResult={findResult} setStep={setStep} />}
    </>
  );
}
