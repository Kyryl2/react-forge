import { Route, Routes } from "react-router-dom";
import ReduxTest from "./pages/ReduxTest/ReduxTest";

import RestrictedRoute from "./routes/RestrictedRoute";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userRefreshThunk } from "./redux/auth/operations";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRefreshThunk());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login" component={<DashboardPage />} />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegistrationPage />} />
          }
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
        />

        <Route path="/redux-test" element={<ReduxTest />} />
      </Routes>
    </>
  );
}

export default App;
