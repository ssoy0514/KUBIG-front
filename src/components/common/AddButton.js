import { styled } from "styled-components";

export const AddButton = styled.button`
  border-radius: 5px;
  z-index: 1;
  background: #a8352c;
  display: inline-flex;
  width: fit-content;
  padding: 0.15rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: white;
  cursor: pointer;
  a {
    color: #ffffff;
    text-align: center;
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem;
  }
  &:hover {
    background: #9e1f15;
    transition: color 0.2s ease, background-color 0.2s ease;
  }
`;

export const EditButton = styled.button`
  background: #a8352c;
  display: inline-flex;
  width: fit-content;
  padding: 0.3rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  a {
    color: #f8f9fa;
    text-align: center;
    font-size: 1.1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem;
  }
  &:hover {
    background: #9e1f15;
    transition: color 0.2s ease, background-color 0.2s ease;
  }
`;
