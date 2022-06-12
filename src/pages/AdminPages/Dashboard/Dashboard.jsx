import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { AUTH } from "../../../utils/helpers/AuthCookies";
import "../../../assets/css/style.css";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main lg:px-7 pt-20 lg:text-xl text-xs">
        <h1 className="lg:text-2xl lg:text-left text-lg text-center dark:text-white text-primary-grey">Selamat Datang {AUTH.getFullname()}</h1>
      </div>
    </>
  );
}
