import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RestrictedRoute from "./routes/RestrictedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Loader from "./components/Loader/Loader";

import { userRefreshThunk } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import useMedia from "./hooks/useMedia";
import { easyLazyPage, easyLazyComponent } from "./helpers/easyLazy";

const NotFound = easyLazyPage("NotFound");
const DashboardPage = easyLazyPage("DashboardPage");
const LoginPage = easyLazyPage("LoginPage");
const RegistrationPage = easyLazyPage("RegistrationPage");
const HomeTab = easyLazyComponent("HomeTab");
const StatisticsTab = easyLazyComponent("StatisticsTab");
const Currency = easyLazyComponent("Currency");

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
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute component={<DashboardPage />} />}
            >
              <Route index element={<HomeTab />} />

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

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
