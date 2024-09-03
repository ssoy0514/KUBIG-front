import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";

export default function ModalPortal({ children, isShowing, setIsShowing }) {
  const [portalElement, setProtalElement] = useState(null);
  useEffect(() => {
    setProtalElement(document.getElementById("modal"));
  }, [isShowing]);
  return portalElement
    ? ReactDOM.createPortal(
        <>
          {isShowing && (
            <>
              <ModalWrapper onClick={() => setIsShowing(false)} />
              <ModalContent> {children}</ModalContent>
            </>
          )}
        </>,
        portalElement
      )
    : null;
}

export const ModalWrapper = styled.div`
  z-index: 5;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(2px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  align-items: center;
  flex-direction: column;
`;

export const ModalContent = styled.div`
  z-index: 7;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //padding: auto;
`;

export const ModalBtn = styled.button`
  width: ${(props) => (props.w ? props.w + "rem" : "6rem")};
  height: ${(props) => (props.h ? props.h + "rem" : "3rem")};
  border-radius: ${(props) => (props.br ? props.br + "rem" : "0.675rem")};
  background: ${(props) => (props.c ? props.c : "#9e1f15")};
  color: ${(props) => (props.fc ? props.fc : "#fff;")};
  text-align: center;
  font-size: ${(props) => (props.fs ? props.fs + "rem" : "1rem;")};
  font-weight: 400;
  border: none;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  padding: 0.5rem 1rem;
`;
