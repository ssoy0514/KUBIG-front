import { useState } from "react";
import { styled } from "styled-components";

export default function ProjectSideBar({
  category,
  semesters,
  setSelectedSemester,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const categoryStr = category.charAt(0).toUpperCase() + category.slice(1);
  const handleSelectHandler = (e) => {
    setSelectedSemester(e.target.value);
  };

  return (
    semesters && (
      <SideBarWrapper>
        <SideBarContent>
          <SessionContainer>
            <h5>{categoryStr} Session</h5>
            <SelectContainer onChange={handleSelectHandler}>
              <option value="" disabled>
                년도
              </option>
              {semesters.map((s, i) => (
                <option value={s.id} key={i}>
                  {s.name}
                </option>
              ))}
            </SelectContainer>
          </SessionContainer>
          <Divider>
            <RedLine />
          </Divider>
          <SubCategoryContainer>
            {categories.map((c, i) => (
              <h3
                key={i}
                style={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  cursor: "pointer",
                  fontWeight: selectedCategory === c.id ? 700 : 400,
                }}
                onClick={() => {
                  if (selectedCategory === c.id) setSelectedCategory(null);
                  else setSelectedCategory(c.id);
                }}
              >
                {c.name} <h5 style={{ color: "#9E0000", fontWeight: 400 }}>{c.count}</h5>
              </h3>
            ))}
          </SubCategoryContainer>
        </SideBarContent>
      </SideBarWrapper>
    )
  );
}

const SideBarWrapper = styled.div`
  width: 22%;
  padding-left: 5vw;
  padding-top: 4rem;
`;
const SideBarContent = styled.div`
  float: top;
`;
const SessionContainer = styled.div`
  h5 {
    color: rgba(158, 31, 21, 0.5);
    font-size: 0.875rem;
    font-weight: 700;
  }
  display: flex;
  border-bottom: 1px #d6d8db solid;
  padding-bottom: 5px;
`;
const Divider = styled.div``;
const RedLine = styled.div`
  width: 3.9375rem;
  height: 0.125rem;
  background: #9e1f15;
  transform: translateY(-100%);
`;

const SelectContainer = styled.select`
  width: 8rem;
  height: 1.9375rem;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  background: #f9fafc;
  margin-left: auto;
`;
const SubCategoryContainer = styled.div`
  padding-top: 2rem;
`;
