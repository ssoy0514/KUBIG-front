import { useContext , React} from "react";
import RecruitingNavBar from "../../components/Recruiting/RecruitingNavBar";
import Faq from "../../components/Recruiting/FAQ/Faq";
import RecruitingBanner from "../../components/Recruiting/RecruitingBanner";
import AuthContext from "../../components/Auth/AuthContext";

export default function FaqPage() {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.role === "admin" ? true : false;
  return (
    <>
      <RecruitingBanner imgurl={"RecruitingImage.png"} />
      <RecruitingNavBar subMenu={1} />
      <Faq isAdmin={isAdmin} />
    </>
  );
}
