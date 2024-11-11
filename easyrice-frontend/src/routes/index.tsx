import { Routes as Router, Route } from "react-router-dom";
import History from "../pages/History";
import EditResult from "../pages/EditResult";
import CreateInspection from "../pages/CreateInspection";
import Navbar from "../components/Navbar";
import ResultPage from "../pages/Result";

const Routes = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/" element={<History />} />
        <Route path="/create" element={<CreateInspection />} />
        <Route path="/edit/:id" element={<EditResult />} />
      </Router>
    </>
  );
};

export default Routes;
