import { jwtDecode } from "jwt-decode";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const auth = useCallback(async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExp = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExp && tokenExp < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    auth().catch(() => {
      setIsAuthorized(false);
    });
  }, [auth]);

  if (isAuthorized == null) return <div>Loading...</div>;

  return <>{isAuthorized ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
