import { HashRouter, Routes, Route } from "react-router-dom";
import RequestsList from "../pages/RequestsList";
import RequestDetail from "../pages/RequestDetail";
import RequestState from "../pages/RequestState";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RequestsList />} />
        <Route path="/requests/:id" element={<RequestDetail />} />
        <Route path="/requests/:id/state" element={<RequestState />} />
      </Routes>
    </HashRouter>
  );
}