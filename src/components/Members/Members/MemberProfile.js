import { React, useEffect, useState } from "react";
import { styled } from "styled-components";
import ProfileCard from "./ProfileCard";
import PageSelect from "../../Members/common/PageSelect";
import { ReactComponent as SearchIcon } from "../../../image/SearchIcon.svg";
import PageBtn from "../../common/PageBtn";
import axios from "../../../api/axios";

export default function MemberProfile(props) {
  const numberOptions = Array.from({ length: props.gen + 1 }, (_, index) => index);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGen, setSelectedGen] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 20;
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/members"
      );
      setMembersData(response.data);
    } catch (err) {
      alert(err);
    }
  };

  const filteredMembers = membersData.filter((member) => {
    const genMatch = selectedGen === "전체" || member.gen === selectedGen;
    const nameMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    return genMatch && nameMatch;
  });
  const sortMembersByGenDescending = (a, b) => {
    // "전체"를 선택한 경우, 기수 숫자로 비교하고 "전체"가 아닌 경우에는 두 값을 비교합니다.
    if (selectedGen === "전체") {
      return b.gen - a.gen;
    } else {
      return b.gen === selectedGen ? 1 : -1;
    }
  };
  const sortedMembers = filteredMembers.slice().sort(sortMembersByGenDescending);

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGenChange = (event) => {
    if (event.target.value === "전체") setSelectedGen("전체");
    else setSelectedGen(parseInt(event.target.value, 10));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Wrapper>
      <PageSelect p={"mem"} />
      <TitleBox>
        <h1>KUBIG MEMBERS</h1>
      </TitleBox>

      <FilterContainer>
        <Selector value={selectedGen} onChange={handleGenChange}>
          <option value="전체">전체</option>
          {numberOptions.map((number) => (
            <option key={number} value={number}>
              {number > 0 ? number.toString()+'기' : '지도교수'}
            </option>
          ))}
        </Selector>

        <SearchForm>
          <SearchIcon />
          <SearchInput
            type="search"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchForm>
      </FilterContainer>

      <ProfileContainer>
        {sortedMembers
          .slice((currentPage - 1) * membersPerPage, currentPage * membersPerPage)
          .map((member, i) => (
            <ProfileCard member={member} key={i} />
          ))}
      </ProfileContainer>
      <Pagination>
        <PageBtn currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </Pagination>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5rem 15vw 10rem 15vw;
`;
const TitleBox = styled.div`
  /* H1 */
  h1 {
    color: #9e1f15;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 180%; /* 3.6rem */
  }
`;
const FilterContainer = styled.div`
  display: flex;
  margin: 2rem 0 2rem 0;
  gap: 1rem;
`;
const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 1vw;
  grid-row-gap: 3rem;
`;

const Selector = styled.select`
  width: 8.125rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;

  background: #f9fafc;
  color: #252525;
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
`;

const SearchForm = styled.form`
  display: flex;
  width: 21.25rem;
  height: 2.5rem;
  border-radius: 0.3125rem;
  border: 1px solid #d6d8db;
  background: #eff2f3;

  svg {
    width: 2rem;
    margin-left: 0.2rem;
    margin-top: 0.7rem;
  }
`;

const SearchInput = styled.input`
  width: 18rem;
  height: 100%;
  padding: 0.3rem;
  font-size: 1rem;
  color: #979797;
  border: 0;
  background: transparent;

  &:focus {
    outline: none;
  }
`;

const Pagination = styled.div`
  margin-top: 5rem;

  align-items: center;
  margin-right: auto;
  margin-left: auto;
`;
