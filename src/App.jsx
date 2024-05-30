import { Route, Routes } from "react-router-dom";
import ReduxTest from "./pages/ReduxTest/ReduxTest";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <Routes>
      <Route index element={null}></Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/redux-test" element={<ReduxTest />} />
    </Routes>
  );
}

export default App;
