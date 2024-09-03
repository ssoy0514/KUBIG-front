import { styled } from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-items: center;
  min-width: 500px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: ${(props) => (props.w ? props.w + "rem" : "33.75rem")};
  height: ${(props) => (props.h ? props.h + "rem" : "32rem")};
  border-radius: 1rem;
  //border: 1px solid #dadcdf;
  background: ${(props) => (props.c ? props.c : "#fff")};
  margin: 5rem auto 10rem auto;
  padding: 3rem 0 2.5rem 0;
  box-shadow: 0px 0px 20px 0px rgba(214, 216, 219, 0.5);

  h3 {
    margin-top: 0.5rem;
    margin-bottom: 3rem;
  }
`;

export const IconText = styled.div`
  align-items: center;
  text-align: center;
  color: #020202;
  img {
    width: 80px;
  }
  h1 {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 180%;
  }
  h4 {
    font-size: 14px;
  }
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  //justify-content: space-evenly;
  flex-grow: 1;
  width: 80%;
  position: relative;
  bottom: -5rem;
`;

export const FormBox = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  height: ${(props) => (props.h ? props.h + "rem" : "6rem")};

  p {
    color: #000;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 180%;
    background-color: #fff;
    width: ${(props) => (props.w ? props.w + "rem" : "3rem")};
    z-index: 9999;
    text-align: center;
    position: relative;
    top: 0.8rem;
    left: 1rem;
  }

  img {
    position: relative;
    top: -3.4rem;
    z-index: 9999;
    left: 24rem;
    width: 1rem;
  }

  select:focus,
  input:focus {
    outline: 0;
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
    opacity: 0;
  }
  &.authcode {
    position: relative;
    bottom: 2.5rem;
  }
`;

export const InputField = styled.input`
  border-radius: 0.3125rem;
  border: 1.43px solid #dadcdf;
  width: 26.6875rem;
  height: 3.5625rem;
  padding-left: 1.8rem;
  padding-top: 0.5rem;
  margin-bottom: 1rem;

  color: #020202;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;

  .signup {
    width: 90%;
    height: 90%;
    border-color: transparent;
    background-color: transparent;
  }
  &::placeholder {
    color: #bdbdbd;
    font-size: 1rem;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #fff inset;
    -webkit-text-fill-color: #000;
  }

  &:focus {
    outline: 0;
    border: #dadcda solid 2px;
    box-shadow: 0 0 0.5rem #dadcdb;
    background-color: transparent;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const Button = styled.button`
  width: ${(props) => (props.w ? props.w + "rem" : "26.6875rem")};
  height: ${(props) => (props.h ? props.h + "rem" : "3.58756rem")};
  border-radius: ${(props) => (props.br ? props.br + "rem" : "0.3125rem")};
  background: ${(props) => (props.c ? props.c : "#9e1f15")};
  color: ${(props) => (props.fc ? props.fc : "#fff;")};
  text-align: center;
  font-size: ${(props) => (props.fs ? props.fs + "rem" : "1.125rem;")};
  font-weight: 400;

  &.resend {
    position: relative;
    z-index: 9999;
    bottom: 3.6rem;
    left: 21rem;
  }

  &.confirm {
    width: 5.5625rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.6rem;
    font-size: 0.9375rem;
    z-index: 9999;
    position: relative;

    bottom: 0.5rem;
    left: 4rem;
  }
`;

export const MenuBar = styled.div`
  display: flex;
  width: ${(props) => (props.w ? props.w + "rem" : "26.6875rem")};
  padding-right: 5rem;
  justify-content: center;
  width: max-content;
  position: relative;
  bottom: 1.5rem;

  & > .tools {
    display: flex;
    width: max-content;
    color: rgba(0, 0, 0, 0.7);
  }
  & > .tools p {
    margin-right: 1rem;
    color: #8f94a1;
    font-size: 0.9375rem;
    font-weight: 400;
    position: relative;
    bottom: -2.8rem;
    left: 1.3rem;
  }
  & > .menu {
    display: flex;
    width: max-content;
    color: rgba(0, 0, 0, 0.7);
  }
  & > .menu p {
    margin-right: 1rem;
    color: #8f94a1;
    font-size: 0.9375rem;
    font-weight: 400;
    position: relative;
    //bottom: -2.8rem;
    left: 1.3rem;
  }
  &:hover{
    transition: 
  }
`;

export const IdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.75rem;
  height: 9rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1.5px solid c;
  text-align: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 3rem;
  h1 {
    color: #9e1f15;
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  p {
    color: #979797;
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  //justify-content: ;
  gap: 0.7rem;
`;

export const StyledInput = styled.div`
  border-radius: 0.6rem;
  border: 1.43px solid #e5e5e5;
  background: #f8f8f8;
  width: ${(props) => (props.w ? props.w : "auto")};
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: border-color 0.1s ease-in-out;

  img {
    position: relative;
    top: 0.3rem;
    left: 2.5rem;
  }

  select:focus,
  input:focus {
    outline: 0;
    background-color: transparent;
  }
  .correct {
    opacity: 0.1;
    margin-left: 0.25rem;
  }
  .valid {
    opacity: 0.4;
    margin-left: 0.25rem;
  }
  .invalid {
    color: #ff6969;
    margin-left: 0.25rem;
  }
  .hide {
    opacity: 0;
  }

  &:focus-within {
    outline: 0;
    border: #dadcdf solid 1.5px;
    //background-color: #020202;
  }
`;

export const StyledInputGroup = styled.div`
  width: 100%;
  &:focus-within .invalid {
    outline: 0;
    border: #ff6969 solid 1.5px;
    background-color: rgba(255, 105, 105, 0.1);
  }
  &:focus-within .invalid > img {
    outline: 0;
    border: none;
    background-color: transparent;
  }
`;

export const ErrText = styled.div`
  font-size: 0.75rem;
  border-radius: 0.5rem;
  color: #ff6969;
  padding: 0.25rem;
  position: relative;
  top: -3rem;
  height: 0.8rem;

  &.invalid {
    color: #ff6969;
    margin-left: 0.25rem;
  }
  &.hide {
    opacity: 0;
  }
`;
