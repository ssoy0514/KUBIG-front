import React, { useEffect, useState } from "react";
import MemberBanner from "../../components/Members/common/MemberBanner";
import Administrator from "../../components/Members/Organization/Administrator";
import Teams from "../../components/Members/Organization/Teams";
import axios from "../../api/axios";

export default function Organization() {
  const [maxGen, setMaxGen] = useState(0);

  const fetchMaxGen = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_KUBIG_PUBLIC_API_URL + `/auth/generation`
      );
      setMaxGen(response.data);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    fetchMaxGen();
  }, []);
  return (
    <>
      <MemberBanner g={maxGen} />
      <Administrator g={maxGen} />
      <Teams />
    </>
  );
}
