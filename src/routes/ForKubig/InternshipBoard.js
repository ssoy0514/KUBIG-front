import { useContext, React } from "react";
import Banner from "../../components/Recruiting/RecruitingBanner";
import ForKubigNavBar from "../../components/ForKubig/ForKubigNavBar";
import TopPosts from "../../components/ForKubig/TopPosts";
import AuthContext from "../../components/Auth/AuthContext";
import withAuth from "../../lib/wihAuth";
import Notice from "../../components/Recruiting/Notice/Notice";

function InternshipBoard() {
  //const [subMenu, setSubmenu] = useState(0);
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.role === "admin" ? true : false;

  return (
    <>
      <Banner imgurl={"ForKubigBanner.png"} />
      <ForKubigNavBar subMenu={1} />
      <TopPosts isAdmin={isAdmin} subMenu={1} />
      <Notice isAdmin={isAdmin} mode={2} />
    </>
  );
}
export default withAuth(InternshipBoard);
