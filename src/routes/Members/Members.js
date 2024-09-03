import { useEffect, useState } from "react";
import MemberBanner from "../../components/Members/common/MemberBanner";
import MemberProfile from "../../components/Members/Members/MemberProfile";
import axios from "axios";

export default function Members() {
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
      <MemberBanner />
      <MemberProfile gen={maxGen} />
    </>
  );
}
