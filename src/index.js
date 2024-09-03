import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import WhoWeAre from "./routes/AboutKubig/WhoWeAre";
import Organization from "./routes/Members/Organization";
import Members from "./routes/Members/Members";
import Professor from "./routes/AboutKubig/Professor";
import SpecialSession from "./routes/Extracurricular/SpecialSession";
import Collaboration from "./routes/Extracurricular/Collaboration";
import Awards from "./routes/Extracurricular/Awards";
import Login from "./routes/Auth/Login";
import Register from "./routes/Auth/Register";
import FindId from "./routes/Auth/FindId";
import Resetpw from "./routes/Auth/Resetpw";
import Mypage from "./routes/Auth/Mypage";
import StudyDetail from "./routes/Studies/StudyDetail";
import Study from "./routes/Studies/Study";
import { AuthContextProvider } from "./components/Auth/AuthContext";
//import Recruiting from "./routes/Recruiting/Recruiting";
import RecruitingInfo from "./routes/Recruiting/RecruitInfo";
import FaqPage from "./routes/Recruiting/FaqPage";
import RecruitingNotice from "./routes/Recruiting/RecruitingNotice";
import StudyNew from "./routes/Studies/StudyNew";
import Project from "./routes/Projects/Project";
import ProjectNew from "./routes/Projects/ProjectNew";
import ProjectDetail from "./routes/Projects/ProjectDetail";
import ExtraNew from "./routes/Extracurricular/ExtraNew";
import Partnership from "./routes/Extracurricular/Partnership";
import NoticeNew from "./routes/Recruiting/NoticeNew";
import NoticeDetail from "./routes/Recruiting/NoticeDetail";
import FaqNew from "./routes/Recruiting/FaqNew";
import KubigBoard from "./routes/ForKubig/KubigBoard";
import InternshipBoard from "./routes/ForKubig/InternshipBoard";
import Calender from "./routes/ForKubig/CalenderPage";
import AwardNew from "./routes/Extracurricular/AwardNew";
import ProjectEdit from "./routes/Projects/ProjectEdit";
import StudiesEdit from "./routes/Studies/StudiesEdit";
import Admin from "./routes/Admin";
//import Faq from "./components/Recruiting/FAQ/Faq";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "who-we-are",
        element: <WhoWeAre />,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
            ///action: loginAction,
          },
          { path: "register", element: <Register /> },
          { path: "resetpw", element: <Resetpw /> },
          { path: "findid", element: <FindId /> },
          { path: "mypage", element: <Mypage /> },
        ],
      },

      { path: "organization", element: <Organization /> },
      { path: "members", element: <Members /> },
      { path: "professor", element: <Professor /> },
      {
        path: "recruiting",

        children: [
          //{ path: "", element: <Recruiting /> },
          { path: "", element: <RecruitingInfo /> },
          { path: "faq", element: <FaqPage /> },
          { path: "notice", element: <RecruitingNotice /> },

          {
            path: "faq/new",
            element: <FaqNew />,
          },
          {
            path: "notice/new",
            element: <NoticeNew mode={0} />,
          },
          {
            path: "notice/:noticeId",
            children: [
              {
                index: true,
                element: <NoticeDetail mode={0} />,
              },
            ],
          },
        ],
      },
      {
        path: "studies",
        children: [
          { path: "", element: <Study /> },
          { path: "new", element: <StudyNew /> },
          {
            path: ":studyId",
            children: [
              {
                index: true,
                element: <StudyDetail />,
              },
              {
                path: "edit",
                element: <StudiesEdit />,
              },
            ],
          },
        ],
      },
      {
        path: "projects",
        children: [
          {
            path: "",
            element: <Project />,
          },
          { path: "new", element: <ProjectNew /> },

          {
            path: ":projectId",
            children: [
              {
                index: true,
                element: <ProjectDetail />,
              },
              {
                path: "edit",
                element: <ProjectEdit />,
              },
            ],
          },
        ],
      },
      {
        path: "extra",
        children: [
          {
            path: "new",
            element: <ExtraNew />,
          },
          {
            path: "awards/new",
            element: <AwardNew />,
          },
          {
            path: "partnership",
            element: <Partnership />,
          },
          { path: "session", element: <SpecialSession /> },
          { path: "collaboration", element: <Collaboration /> },
          { path: "awards", element: <Awards /> },
        ],
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "for-kubig",

        children: [
          {
            path: "notice",
            element: <KubigBoard />,
          },
          {
            path: "intern-notice",
            element: <InternshipBoard />,
          },
          {
            path: "calender",
            element: <Calender />,
          },

          {
            path: "intern-notice/new",
            element: <NoticeNew mode={2} />,
          },
          {
            path: "notice/new",
            element: <NoticeNew mode={1} />,
          },
          {
            path: "notice/:noticeId",
            children: [
              {
                index: true,
                element: <NoticeDetail mode={1} />,
              },
            ],
          },
          {
            path: "intern-notice/:noticeId",
            children: [
              {
                index: true,
                element: <NoticeDetail mode={2} />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
