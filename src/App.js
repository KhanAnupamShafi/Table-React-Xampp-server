import "./App.css";
import { Route, Routes } from "react-router-dom";

import NoMatch from "./components/NoMatch/NoMatch";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home";
import GetForm from "./pages/GetForm/GetForm";
import Navbar from "./components/Navbar/Navbar";
import UpdateForm from "./pages/UpdateForm/UpdateForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="getform" element={<GetForm />} />
          <Route path="getform/:id" element={<UpdateForm />} />

          {/* <Route path="about" element={<About />} />
           */}

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
