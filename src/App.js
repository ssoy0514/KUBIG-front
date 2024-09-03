import MainImage from "./components/Home/MainImage";
import AboutUs from "./components/Home/AboutUs";
import Curriculum from "./components/Home/Curriculum";
import Activities from "./components/Home/Activities";

// 첫 접속시 메인 화면
export default function App() {
  return (
    <>
      <MainImage />
      <AboutUs />
      <Curriculum />
      <Activities />
    </>
  );
}
