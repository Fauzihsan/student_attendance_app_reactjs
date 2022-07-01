import { useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react";
import { GET_ATTENDANCES_STUDENT } from "../../../api/Model/Subscription/GetAttendanceStudents";
import AttendanceValue from "./AttendanceValue";
import HeaderTable from "./HeaderTable";

function PresentTable({ schedule_data, npm }) {
  const { data } = useSubscription(GET_ATTENDANCES_STUDENT, {
    variables: {
      npm: npm,
      schedules_id: schedule_data.id,
    },
  });

  const [persentase, setPersentase] = useState(0);
  useEffect(() => {
    setPersentase(0);
    if (data?.attendances[0].p_1 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_2 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_3 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_4 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_5 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_6 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_7 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_8 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_9 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_10 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_11 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_12 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_13 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
    if (data?.attendances[0].p_14 === 1) {
      setPersentase((persentase) => persentase + 1);
    }
  }, [data]);

  return (
    <>
      <div className="relative w-full overflow-scroll shadow-md sm:rounded-lg">
        <table className="w-max text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <HeaderTable />
          </thead>
          <tbody>
            <AttendanceValue data={data} />
          </tbody>
        </table>
      </div>
      <div className="w-full p-5">
        <div className="justify-center flex flex-col gap-y-5 text-primary-grey dark:text-white">
          <div className="flex flex-row justify-center items-end">
            <p className=" text-center lg:text-6xl text-4xl font-bold">{((persentase / schedule_data.meet_number) * 100).toFixed(1)}</p>
            <p className=" text-center text-lg ">%</p>
          </div>
          <p className=" text-center lg:text-2xl text-lg">Dari {schedule_data.meet_number} Pertemuan</p>
        </div>
      </div>
    </>
  );
}

export default PresentTable;
