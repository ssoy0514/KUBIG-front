import axios from "../../api/axios";

export async function CurrFetch(page, category, setCurr, setTotalPages) {
  try {
    const response = await axios.get(
      process.env.REACT_APP_KUBIG_PUBLIC_API_URL +
        "/extra-curricular/list" +
        `?category=${category}&page=${page}`
    );
    const data = response.data;
    setCurr(data.curricularList);
    setTotalPages(data.last_page);
  } catch (err) {
    alert("에러가 발생하였습니다.");
  }
}
