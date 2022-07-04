import React from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { useSelector } from "react-redux";
import { useSubscription } from "@apollo/client/react";
import { GET_SCHEDULE } from "../../../api/Model/Subscription/GetSchedule";
import LoadingAnimationXL from "../../../components/Loading/LoadingAnimationXL";
import ExportAttendance from "../../../components/ExportAttendance";

function UnduhAbsensi() {
  const prodi = useSelector((state) => state.prodi.id);
  const { data, loading: loadingGetSchedule } = useSubscription(GET_SCHEDULE, {
    variables: {
      prodi,
    },
  });
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Unduh Absensi</h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-5/6 w-full overflow-y-auto">
          <div className="flex lg:flex-row md:flex-row flex-col gap-x-10 gap-y-5 flex-wrap justify-center items-center py-3">
            {loadingGetSchedule ? (
              <LoadingAnimationXL />
            ) : data?.schedules.length !== 0 ? (
              data?.schedules.map((d) => (
                <div key={d.id} className="p-6 lg:w-1/3 md:w-1/3 w-3/4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {d.class.class_name} <br /> {d.course.course_name}
                  </h5>
                  <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                    {d.room} , {d.day} / {d.time}
                  </p>
                  {d.meet_number !== 14 ? <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">Jumlah Pertemuan : {d.meet_number}</p> : <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">PERTEMUAN SELESAI</p>}
                  <ExportAttendance data={d} />
                </div>
              ))
            ) : (
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Jadwal Kosong</h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UnduhAbsensi;
