import { css, styled } from "styled-components";

export default function RecruitingNavBar({ subMenu, setSubmenu }) {
  return (
    <Wrapper>
      <NavItemWrapper
        onClick={() => setSubmenu(0)}
        $selectedsubmenu={subMenu === 0 ? "selected" : ""}
      >
        <a href="/for-kubig/notice">
          <h2>Notice</h2>
        </a>
      </NavItemWrapper>
      <NavItemWrapper
        onClick={() => setSubmenu(1)}
        $selectedsubmenu={subMenu === 1 ? "selected" : ""}
      >
        <a href="/for-kubig/intern-notice">
          <h2>Internship & Project</h2>
        </a>
      </NavItemWrapper>
      <NavItemWrapper
        onClick={() => setSubmenu(2)}
        $selectedsubmenu={subMenu === 2 ? "selected" : ""}
      >
        <a href="/for-kubig/calender">
          <h2>Calendar</h2>
        </a>
      </NavItemWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 3rem;
`;
const NavItemWrapper = styled.button`
  width: 24%;

  ${(props) => {
    if (props.$selectedsubmenu === "selected") {
      return css`
        border-bottom: 4px solid #9e1f15;
        h2 {
          color: #9e1f15;
          font-size: 1.5rem;
        }
      `;
    } else {
      return css`
        h2 {
          color: #d9d9d9;
          font-weight: 400;
          font-size: 1.5rem;
        }
        border-bottom: 2px solid #d9d9d9;
        &:hover {
          border-bottom: 3px solid #d9d9d9;
          transition: all 0.2s;
        }
      `;
    }
  }};
`;
