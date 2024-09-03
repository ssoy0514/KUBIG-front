import { NavLink } from "react-router-dom";
import { styled, css } from "styled-components";

export default function Dropdown({ submenus, show }) {
  return (
    <Ul className="dropdown-menu" $show={show ? "show" : ""}>
      {submenus.map((submenu, index) => {
        return (
          <li key={index}>
            <NavLink to={submenu.url}>
              <DropdownItem>{submenu.title}</DropdownItem>
            </NavLink>
          </li>
        );
      })}
    </Ul>
  );
}

const Ul = styled.div`
  position: absolute;
  top: 48px;
  left: inherit;

  width: 10rem;
  //margin: 0; // Override default margin of ul
  text-align: center; // Ensures proper alignment if parent has it changed (e.g., modal footer)
  list-style: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 7px;

  ${(props) =>
    props.$show === "show"
      ? css`
          display: block;
        `
      : css`
          display: none;
        `};
`;

const DropdownItem = styled.button`
  display: block;
  width: 10rem;
  text-align: center;
  padding: 1rem;
  z-index: 9999;
  clear: both;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
  font-size: 0.89rem;
  white-space: nowrap; // prevent links from randomly breaking onto new lines
  background-color: rgba(255, 255, 255, 0.7);
  

  &:hover,
  &:focus {
    color: #fff;
    background-color: #9e1f15e6;
    transition: all 0.25s;
    border-radius: 3px;
  }
`;
