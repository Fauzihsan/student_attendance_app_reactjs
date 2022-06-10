import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import ErrorPage from "./pages/Error/ErrorPage";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/AdminPages/Dashboard/Dashboard";
import KelolaMahasiswa from "./pages/AdminPages/KelolaMahasiswa/KelolaMahasiswa";
import KelolaDosen from "./pages/AdminPages/KelolaDosen/KelolaDosen";
import Penjadwalan from "./pages/AdminPages/Penjadwalan/Penjadwalan";
import KelolaKelas from "./pages/AdminPages/KelolaKelas/KelolaKelas";
import HasSignInRoute from "./routes/HasSignInRoute";
import KelolaMatkul from "./pages/AdminPages/KelolaMatkul/KelolaMatkul";
import StudentRoute from "./routes/StudentRoute";
import LihatAbsensi from "./pages/StudentPages/LihatAbsensi/LihatAbsensi";
import Akun from "./pages/Akun/Akun";
import LecturerRoute from "./routes/LecturerRoute";
import Absensi from "./pages/LecturerPages/Absensi/Absensi";
import HomeStudent from "./pages/StudentPages/Home/HomeStudent";
import HomeLecturer from "./pages/LecturerPages/Home/HomeLecturer";

export default function App() {
  return (
    <Routes>
      <Route element={<HasSignInRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/kelolaMahasiswa" element={<KelolaMahasiswa />} />
        <Route path="/admin/kelolaDosen" element={<KelolaDosen />} />
        <Route path="/admin/kelolaKelas" element={<KelolaKelas />} />
        <Route path="/admin/kelolaMatkul" element={<KelolaMatkul />} />
        <Route path="/admin/penjadwalan" element={<Penjadwalan />} />
      </Route>

      <Route element={<StudentRoute />}>
        <Route path="/student" element={<HomeStudent />} />
        <Route path="/student/lihatAbsensi" element={<LihatAbsensi />} />
      </Route>

      <Route element={<LecturerRoute />}>
        <Route path="/lecturer" element={<HomeLecturer />} />
        <Route path="/lecturer/absensi" element={<Absensi />} />
      </Route>

      <Route path="/akun" element={<Akun />} />

      <Route path="*" element={<ErrorPage code="404" title="Ooopss Page Not Found" />} />
    </Routes>
  );
}
