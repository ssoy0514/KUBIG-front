import { useSearchParams } from "react-router-dom";
import ProjectSideBar from "../../components/Projects/ProjectSideBar";
import ProjectList from "../../components/Projects/ProjectList";
import { useEffect, useState } from "react";
import client from "../../lib/httpClient";

export default function Project() {
  const [categorySearchParams] = useSearchParams();
  const session = categorySearchParams.get("category");
  const [semesters, setSemesters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchSemester = async () => {
    try {
      const res = await client.get("/studies/semesters");
      if (res) {
        setSemesters(res.data);
        setSelectedSemester(res.data[0].id);
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    fetchSemester();
  }, []);

  const fetchCategory = async (semester, session) => {
    setSelectedCategory(null);

    try {
      if (semester) {
        const res = await client.get("/project/category/" + semester + "?session=" + session);
        if (res) setCategories(res.data);
      }
    } catch (err) {
      alert("올바르지 않은 접근입니다.");
    }
  };
  useEffect(() => {
    fetchCategory(selectedSemester, session);
  }, [selectedSemester, session]);
  return (
    <div style={{ display: "flex", gap: "3.5rem" }}>
      <ProjectSideBar
        category={session}
        semesters={semesters}
        setSelectedSemester={setSelectedSemester}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <ProjectList session={session} selectedSemester={selectedSemester} selectedCategory={selectedCategory} />
    </div>
  );
}
