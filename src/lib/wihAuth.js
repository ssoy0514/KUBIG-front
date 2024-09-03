import { useContext, useEffect, useState } from "react";
import client, { refresh } from "./httpClient";
import AuthContext from "../components/Auth/AuthContext";

export default function withAuth(WrappedComponent) {
  return function ReactComponent(props) {
    const [isAuthed, setIsAuthed] = useState(false);
    const [authStatus, setAuthStatus] = useState("checking");
    const authCtx = useContext(AuthContext);

    const fetch = async () => {
      try {
        const response = await client.get(
          process.env.REACT_APP_KUBIG_PUBLIC_API_URL + "/auth/profile"
        );
        if (!response.data || !(response.data.name && response.data.role)) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        } else {
          authCtx.setName(response.data.name);
          authCtx.setRole(response.data.role);
        }
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    };
    const checkAuth = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        setAuthStatus("refreshing");

        const refreshResult = await refresh();
        setIsAuthed(refreshResult);
      }
      setAuthStatus("done");
    };
    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken && authCtx.name !== "") {
        setIsAuthed(true);
        setAuthStatus("done");
      } else if (accessToken && authCtx === "") {
        fetch();
      } else checkAuth();
    }, []);

    // TODO: add loading spinner
    switch (authStatus) {
      case "checking":
      case "refreshing":
        return <div>refreshing..</div>;
      case "done":
        return isAuthed ? <WrappedComponent {...props} /> : <RedirectionComponent />;
      default:
    }
  };
}

const RedirectionComponent = () => {
  useEffect(() => {
    window.location.href = "/auth/login";
  }, []);
  return null;
};
