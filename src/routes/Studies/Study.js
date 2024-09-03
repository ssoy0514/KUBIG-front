import { useSearchParams } from "react-router-dom";

import StudyList from "../../components/Studies/StudyList";
import StudySideBar from "../../components/Studies/StudySideBar";
import { useEffect, useState } from "react";
import client from "../../lib/httpClient";

export default function Study() {
  const [difficultySearchParams] = useSearchParams();
  const session = difficultySearchParams.get("difficulty");

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
    try {
      setSelectedCategory(null);

      if (semester) {
        const res = await client.get("/studies/category/" + semester + "?session=" + session);
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
      <StudySideBar
        category={session}
        semesters={semesters}
        setSelectedSemester={setSelectedSemester}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <StudyList session={session} selectedSemester={selectedSemester} selectedCategory={selectedCategory} />
    </div>
  );
}
