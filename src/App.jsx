import { Route, Routes } from "react-router-dom";
import ReduxTest from "./pages/ReduxTest/ReduxTest";
// import RestrictedRoute from "./routes/RestrictedRoute";
// import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
// import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <Routes>
      {/* <Route
        path="/register"
        element={
          <RestrictedRoute
            redirectTo="/tasks"
            component={<RegistrationPage />}
          />
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
        }
      /> */}
      <Route index element={null}></Route>
      <Route path="/redux-test" element={<ReduxTest />} />
    </Routes>
  );
}

export default App;
