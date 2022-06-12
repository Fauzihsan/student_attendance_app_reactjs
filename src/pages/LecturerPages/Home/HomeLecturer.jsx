import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { AUTH } from "../../../utils/helpers/AuthCookies";

export default function HomeLecturer() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main lg:px-7 pt-20 lg:text-xl text-xs">
        <h1 className="lg:text-2xl lg:text-left text-lg text-center text-white">Selamat Datang {AUTH.getFullname()}</h1>
      </div>
    </>
  );
}
