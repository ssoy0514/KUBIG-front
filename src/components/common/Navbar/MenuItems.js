import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useMediaQuery } from "react-responsive";

export default function MenuItems({ items }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1080px)",
  });
  let ref = useRef();
  const [dropdown, setDropdown] = useState(false);
  const onMouseEnter = () => {
    isDesktopOrLaptop && setDropdown(true);
  };

  const onMouseLeave = () => {
    isDesktopOrLaptop && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };
  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  return (
    <Dropdowncontainer
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.submenu ? (
        <>
          <Button onClick={() => setDropdown((prev) => !prev)}>
            {isDesktopOrLaptop ? (
              <NavLink to={items.url} style={{ whiteSpace: "nowrap" }}>
                <p>{items.title}</p>
              </NavLink>
            ) : (
              <p>{items.title}</p>
            )}
          </Button>
          <Dropdown submenus={items.submenu} show={dropdown} />
        </>
      ) : (
        <>
          <Button>
            <NavLink to={items.url} style={{ whiteSpace: "nowrap" }}>
              <p> {items.title}</p>
            </NavLink>
          </Button>
        </>
      )}
    </Dropdowncontainer>
  );
}

const Dropdowncontainer = styled.div`
  /* margin-top: 9px; */
  width: max-content;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  //border: none;
  background: none;
  display: inline-block;
  

  p {
    color: #1e1e1ed9;
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
  }

  &:hover,
  &:focus {
    p {
      color: #9e1f15;
    }
  }
`;
