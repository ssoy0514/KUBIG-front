import { styled } from "styled-components";

export default function PageBtn({ currentPage, totalPages, onPageChange }) {
  const start =
    currentPage % 5 === 0
      ? Math.floor(currentPage / 5) * 5 - 4
      : Math.floor(currentPage / 5) * 5 + 1;
  const end = start + 4;
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    if (page > totalPages) {
      onPageChange(totalPages);
    }
  };

  const renderButtons = () => {
    const buttons = [];

    // 페이지 번호 버튼
    for (let i = start; i <= end; i++) {
      if (i <= totalPages) {
        buttons.push(
          <Btn
            key={i}
            className={i === currentPage ? "selected" : "notSelected"}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Btn>
        );
      } else {
        break;
      }
    }

    return buttons;
  };

  return (
    <BtnWrapper>
      <Btn key="prev" onClick={() => handlePageChange(currentPage - 5)}>
        &lt;
      </Btn>
      {renderButtons()}
      <Btn key="next" onClick={() => handlePageChange(currentPage + 5)}>
        &gt;
      </Btn>
    </BtnWrapper>
  );
}

const BtnWrapper = styled.div`
  display: flex;
  gap: 0.9rem;
  justify-content: flex-end;
  width: 100%;
  margin-left: auto;
  & > .selected:hover {
    //filter: brightness(0.9);
  }
`;

const Btn = styled.button`
  display: flex;
  width: 31.2px;
  height: 31.2px;
  padding: 7.2px 10.8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  border: 1.2px solid #eee;
  background: #f2f2f2;
  color: #404b52;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 0.9rem */
  letter-spacing: -0.009rem;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transition: color 0.2s ease, background-color 0.2s ease;

  }

  &.selected {
    border-radius: 8px;
    //border: 1.2px solid #4295f7;
    background: #A8352C;
    color: #fff;
  }
`;
