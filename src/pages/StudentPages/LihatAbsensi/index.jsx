import { useQuery, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { GET_ONE_USER } from "../../../api/Model/Query/GetOneUser";
import Header from "../../../components/Header";
import { AUTH } from "../../../utils/helpers/AuthCookies";
import LoadingAnimationXL from "../../../components/Loading/LoadingAnimationXL";
import { GET_SCHEDULE_BY_STUDENT } from "../../../api/Model/Subscription/GetScheduleByStudent";
import ModalSeeAttendance from "../../../components/Modal/ModalSeeAttendance";

function LihatAbsensi() {
  const [npm, setNpm] = useState("");
  const { data: dataStudents, loading: loadingGetUser } = useQuery(GET_ONE_USER, {
    variables: {
      username: AUTH.getAuth(),
    },
  });

  const { data, loading: loadingGetSchedule } = useSubscription(GET_SCHEDULE_BY_STUDENT, {
    variables: {
      npm,
    },
  });

  useEffect(() => {
    setNpm(dataStudents?.users[0].username);
  }, [dataStudents]);

  return (
    <>
      <Header />
      <div className="w-full bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <div className="flex lg:flex-row flex-col justify-center items-center p-3">
          <img src={require("../../../assets/img/ftLogo.png")} className="h-12 mr-3 " alt="FT Logo" />
          <div className="flex lg:flex-row flex-col justify-center items-center gap-2">
            <h1 className="lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Absensi Fakultas Teknik</h1>
            <h1 className="lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white opacity-50"> {AUTH.getFullname()}</h1>
          </div>
        </div>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-5/6 w-full overflow-y-auto">
          <div className="flex lg:flex-row md:flex-row flex-col gap-x-10 gap-y-5 flex-wrap justify-center items-center py-3">
            {loadingGetUser || loadingGetSchedule ? (
              <LoadingAnimationXL />
            ) : data?.schedules.length !== 0 ? (
              data?.schedules.map((d) => (
                <div key={d.id} className="p-6 lg:w-1/3 md:w-1/3 w-3/4 h-60 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {d.class.class_name} - {d.course.course_name}
                  </h5>
                  <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                    {d.lecturer.nidn} - {d.lecturer.fullname}
                  </p>
                  <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                    {d.room} , {d.day} / {d.time}
                  </p>
                  <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">Pertemuan : Ke-{d.meet_number}</p>
                  <ModalSeeAttendance data={d} npm={npm} role={"student"} />
                </div>
              ))
            ) : (
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Tidak ada mata kuliah yang di ambil</h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LihatAbsensi;
