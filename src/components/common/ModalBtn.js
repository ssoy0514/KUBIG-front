import { styled } from "styled-components";

export const ModalBtn = styled.button`
  width: ${(props) => (props.w ? props.w + "rem" : "6rem")};
  height: ${(props) => (props.h ? props.h + "rem" : "2.5rem")};
  border-radius: ${(props) => (props.br ? props.br + "rem" : "0.7rem")};
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
