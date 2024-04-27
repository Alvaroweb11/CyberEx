import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NonAuthRoutes, AuthRoutes } from "../routes";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { startRenewingUser, getTasks } from "../store/slices/auth";

export function Navigation() {
  const status = useCheckAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (status !== 'checking') {
      setIsAuthChecked(true);
    }
  }, [status]);

  const { uid, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthChecked) {
      dispatch(startRenewingUser({ uid, token }));
      dispatch(getTasks({ uid }));
    }
  }, [isAuthChecked, token, uid, dispatch]);

  if (!isAuthChecked) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {status === 'authenticated' ? (
          <Route path="/*" element={<AuthRoutes />} />
        ) : (
          <Route path="/*" element={<NonAuthRoutes />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
