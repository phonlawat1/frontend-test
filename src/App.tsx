import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test1 from "./page/test1";
import Test2 from "./page/test2";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
