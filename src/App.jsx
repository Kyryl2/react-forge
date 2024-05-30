import { Route, Routes } from "react-router-dom";
import ReduxTest from "./pages/ReduxTest/ReduxTest";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Routes>
        <Route index element={null}></Route>
        <Route path="/redux-test" element={<ReduxTest />} />
      </Routes>
      <Header />
    </>
  );
}

export default App;
