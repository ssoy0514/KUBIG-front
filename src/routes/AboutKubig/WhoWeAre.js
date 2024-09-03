import AboutImage from "../../components/AboutUs/AboutImage";
import Channels from "../../components/AboutUs/Channels";
import History from "../../components/AboutUs/History";
import KubigInfo from "../../components/AboutUs/KubigInfo";
import Vision from "../../components/AboutUs/Vision";

export default function WhoWeAre() {
  return (
    <div>
      <AboutImage />
      <KubigInfo />
      <Vision />
      <History />
      <Channels />
    </div>
  );
}
