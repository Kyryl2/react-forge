import { Route, Routes } from "react-router-dom";
import ReduxTest from "./pages/ReduxTest/ReduxTest";

import RestrictedRoute from "./routes/RestrictedRoute";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRefreshThunk } from "./redux/auth/operations";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import HomeTab from "./components/HomeTab/HomeTab";
import StatisticsTab from "./components/StatisticsTab/StatisticsTab";
import { selectIsRefreshing } from "./redux/auth/selectors";

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRefreshThunk());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? null : (
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute redirectTo="/login" component={<DashboardPage />} />
            }
          >
            <Route index element={<HomeTab />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="statistics" element={<StatisticsTab />} />
          </Route>

          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/"
                component={<RegistrationPage />}
              />
            }
          />

          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/" component={<LoginPage />} />
            }
          />

          <Route path="/redux-test" element={<ReduxTest />} />
        </Routes>
      )}
    </>
  );
}

export default App;
