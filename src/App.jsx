import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RestrictedRoute from "./routes/RestrictedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ReduxTest from "./pages/ReduxTest/ReduxTest";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import HomeTab from "./components/HomeTab/HomeTab";
import StatisticsTab from "./components/StatisticsTab/StatisticsTab";
import Loader from "./components/Loader/Loader";
import Currency from "./components/Currency/Currency";
import NotFound from "./pages/NotFound/NotFound";

import { userRefreshThunk } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import useMedia from "./hooks/useMedia";

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRefreshThunk());
  }, [dispatch]);
  const { isMobile } = useMedia();
  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute component={<DashboardPage />} />}
          >
            <Route index element={<HomeTab />} />
            <Route path="dashboard" element={<DashboardPage />} />

            <Route path="statistics" element={<StatisticsTab />} />
            <Route
              path="currency"
              element={isMobile ? <Currency /> : <Navigate to="/" />}
            />
          </Route>

          <Route
            path="/register"
            element={<RestrictedRoute component={<RegistrationPage />} />}
          />

          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />

          <Route path="/redux-test" element={<ReduxTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
