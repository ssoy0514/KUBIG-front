import { useContext , React } from "react";
import RecruitingBanner from "../../components/Recruiting/RecruitingBanner";
import RecruitingNavBar from "../../components/Recruiting/RecruitingNavBar";
import Notice from "../../components/Recruiting/Notice/Notice";
import AuthContext from "../../components/Auth/AuthContext";

const RecruitingNotice = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.role === "admin" ? true : false;

  return (
    <>
      <RecruitingBanner imgurl={"RecruitingImage.png"} />
      <RecruitingNavBar subMenu={2} />
      <Notice isAdmin={isAdmin} mode={0} />
    </>
  );
};

export default RecruitingNotice;
