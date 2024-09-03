import axios from "../../api/axios";
import StudyItem from "../../components/Studies/StudyItem";
import { useEffect, useState } from "react";

export default function StudyDetail() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const id = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );
      const res = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/studies/info/" + id
      );
      if (res) setData(res.data);
      if (!res || !res.data) throw new Error();
    } catch (err) {
      alert("잘못된 접근입니다.");
      window.localStorage.href = "/studies?difficulty=basic";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "3.5rem",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        padding: "5px",
        marginBottom: "7rem",
      }}
    >
      <StudyItem study={data} />
    </div>
  );
}
