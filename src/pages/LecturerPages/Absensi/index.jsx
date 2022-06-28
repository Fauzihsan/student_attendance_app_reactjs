import { useQuery, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { GET_ONE_USER } from "../../../api/Model/Query/GetOneUser";
import { GET_SCHEDULE_BY_LECTURER } from "../../../api/Model/Subscription/GetScheduleByLecturer";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { AUTH } from "../../../utils/helpers/AuthCookies";
import LoadingAnimationXL from "../../../components/Loading/LoadingAnimationXL";

function Absensi() {
  const [nidn, setNidn] = useState("");
  const { data: dataLecturer, loading: loadingGetUser } = useQuery(GET_ONE_USER, {
    variables: {
      username: AUTH.getAuth(),
    },
  });

  const { data, loading: loadingGetSchedule } = useSubscription(GET_SCHEDULE_BY_LECTURER, {
    variables: {
      nidn,
    },
  });

  useEffect(() => {
    setNidn(dataLecturer?.users[0].username);
  }, [dataLecturer]);

  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Absensi</h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-5/6 w-full overflow-y-auto">
          <div className="flex lg:flex-row flex-col gap-x-10 gap-y-5 flex-wrap justify-center items-center py-3">
            {loadingGetUser || loadingGetSchedule ? (
              <LoadingAnimationXL />
            ) : (
              data?.schedules.map((d) => (
                <div key={d.id} className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {d.class.class_name} -- {d.course.course_name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {d.day} - {d.time} - {d.room}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Jumlah Pertemuan : {d.meet_number}</p>
                  <button
                    onClick={() => {}}
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary-blue rounded-lg hover:bg-secondary-blue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary-blue dark:hover:bg-secondary-blue dark:focus:ring-blue-800"
                  >
                    Absen
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Absensi;
