import { Route, Routes } from "react-router-dom";
import ReduxTest from "./pages/ReduxTest/ReduxTest";

function App() {
  return (
    <>
      <p style={{ fontFamily: "Popins" }}>Hello ,world!</p>
      <Routes>
        <Route index element={null}></Route>
        <Route path="/redux-test" element={<ReduxTest />} />
      </Routes>
    </>
  );
}

export default App;
