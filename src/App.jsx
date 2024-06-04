import { Navigate, Route, Routes } from "react-router-dom";
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
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/selectors";

import Loader from "./components/Loader/Loader";
import Currency from "./components/Currency/Currency";
import useMedia from "./hooks/useMedia";

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
 

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRefreshThunk());
  }, [dispatch]);
  const {isMobile} = useMedia()
  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute  component={<DashboardPage />} />
            }
          >
            <Route index element={<HomeTab />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="statistics" element={<StatisticsTab />} />
            <Route path="currency" element={isMobile ? <Currency />: <Navigate to='/'/>} />
          </Route>

          <Route
            path="/register"
            element={
              <RestrictedRoute
             
                component={<RegistrationPage />}
              />
            }
          />

          <Route
            path="/login"
            element={
              <RestrictedRoute  component={<LoginPage />} />
            }
          />

          <Route path="/redux-test" element={<ReduxTest />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      )}
    </>
  );
}

export default App;
