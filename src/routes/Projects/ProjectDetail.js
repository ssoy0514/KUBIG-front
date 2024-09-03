import { useEffect, useState } from "react";
import ProjectItem from "../../components/Projects/ProjectItem";
import axios from "../../api/axios";

export default function ProjectDetail() {
  const [data, setData] = useState(null);
  const id = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
  const fetch = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/project/info/" + id
      );
      if (res) setData(res.data);
      if (!res || !res.data) throw new Error();
    } catch (err) {
      alert("잘못된 접근입니다.");
      window.localStorage.href = "/projects?category=reference";
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "3.5rem",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: "7rem",
      }}
    >
      <ProjectItem project={data} />
    </div>
  );
}
