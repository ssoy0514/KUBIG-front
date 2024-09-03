import { useContext, React } from "react";
import Banner from "../../components/Recruiting/RecruitingBanner";
import ForKubigNavBar from "../../components/ForKubig/ForKubigNavBar";
import TopPosts from "../../components/ForKubig/TopPosts";
import AuthContext from "../../components/Auth/AuthContext";
import withAuth from "../../lib/wihAuth";
import Notice from "../../components/Recruiting/Notice/Notice";

function KubigBoard() {
  //const [subMenu, setSubmenu] = useState(0);
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.role === "admin" ? true : false;

  return (
    <>
      <Banner imgurl={"ForKubigBanner.png"} />
      <ForKubigNavBar subMenu={0} />
      <TopPosts isAdmin={isAdmin} subMenu={0} />
      <Notice isAdmin={isAdmin} mode={1} />
    </>
  );
}
export default withAuth(KubigBoard);
/*
<ForKubigNavBar subMenu={subMenu} setSubmenu={setSubmenu} />
      {subMenu === 0 && <Notice isAdmin={isAdmin} mode={1} />}
      {subMenu === 1 && <Notice isAdmin={isAdmin} mode={2} />}
      {subMenu === 2 && <Calender />}*/
