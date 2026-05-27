import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoProvider } from "./context/DemoContext";
import Splash from "./components/Splash";
import GuestApp from "./components/guest/GuestApp";
import StaffApp from "./components/staff/StaffApp";
import AdminApp from "./components/admin/AdminApp";
import DemoMode from "./components/DemoMode";

function GuestPage() {
  return (
    <div className="min-h-screen bg-[#0c0a14] py-10 flex items-start justify-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c0a14] via-[#1F1B2E] to-[#5B2C91]/40" />
      <GuestApp />
    </div>
  );
}

function StaffPage() {
  return (
    <div className="min-h-screen bg-[#0c0a14] py-10 flex items-start justify-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0c0a14] via-[#1F1B2E] to-[#5B2C91]/40" />
      <StaffApp />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <DemoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/guest" element={<GuestPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/admin" element={<AdminApp />} />
            <Route path="/demo" element={<DemoMode />} />
          </Routes>
        </BrowserRouter>
      </DemoProvider>
    </div>
  );
}
