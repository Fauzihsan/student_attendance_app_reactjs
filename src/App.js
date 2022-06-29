import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/AdminPages/Dashboard";
import KelolaMahasiswa from "./pages/AdminPages/KelolaMahasiswa";
import KelolaDosen from "./pages/AdminPages/KelolaDosen";
import Penjadwalan from "./pages/AdminPages/Penjadwalan";
import KelolaKelas from "./pages/AdminPages/KelolaKelas";
import HasSignInRoute from "./routes/HasSignInRoute";
import KelolaMatkul from "./pages/AdminPages/KelolaMatkul";
import StudentRoute from "./routes/StudentRoute";
import LihatAbsensi from "./pages/StudentPages/LihatAbsensi";
import Akun from "./pages/Akun";
import LecturerRoute from "./routes/LecturerRoute";
import Absensi from "./pages/LecturerPages/Absensi";

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
        <Route path="/student" element={<LihatAbsensi />} />
      </Route>

      <Route element={<LecturerRoute />}>
        <Route path="/lecturer" element={<Absensi />} />
      </Route>

      <Route path="/akun" element={<Akun />} />

      <Route path="*" element={<ErrorPage code="404" title="Ooopss Page Not Found" />} />
    </Routes>
  );
}
