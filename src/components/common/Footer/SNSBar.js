import React, { useState } from "react";
import { styled, css, keyframes } from "styled-components";
import { IconList } from "./IconList";
import { CopyToClipboard } from "react-copy-to-clipboard/src";

export default function SNSBar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <Container>
        <List>
          {IconList.map(({ name, icon, link }) => (
            <Item key={name}>
              {name === "Email" ? (
                <CopyToClipboard text={link} onCopy={handleCopy}>
                  <IconWrapper>{icon()}</IconWrapper>
                </CopyToClipboard>
              ) : (
                <IconWrapper href={link}>{icon()}</IconWrapper>
              )}
            </Item>
          ))}
        </List>
      </Container>
      <CopyNotification visible={copied}>클립보드에 복사되었습니다.</CopyNotification>
    </>
  );
}

const Container = styled.div`
  display: flex;
`;
const List = styled.div`
  display: flex;
`;
const Item = styled.div`
  padding-right: 0.8em;
`;

const IconWrapper = styled.a`
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;
const CopyNotification = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
  transition: visibility 0.5s, opacity 0.5s;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;
