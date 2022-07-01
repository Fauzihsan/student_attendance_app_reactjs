import React from "react";
import { GET_STUDENTS } from "../../api/Model/Subscription/GetStudents";
import { useSubscription } from "@apollo/client/react";
import { useSelector } from "react-redux";
import { GET_LECTURERS } from "../../api/Model/Subscription/GetLecturers";
import LoadingAnimation from "../Loading/LoadingAnimation";

function DashboardListItem() {
  const prodi = useSelector((state) => state.prodi.id);
  const { data: allStudents, loading: loadingStudent } = useSubscription(GET_STUDENTS, { variables: { prodi } });
  const { data: allLecturers, loading: loadingLecturer } = useSubscription(GET_LECTURERS);

  const countAllStudent = allStudents?.students.length;
  const countStudentActive = allStudents?.students.filter((d) => d.is_active === true).length;
  const countStudentNonActive = allStudents?.students.filter((d) => d.is_active === false).length;
  const countLecturer = allLecturers?.lecturers.length;

  return (
    <div className="flex lg:flex-row flex-col lg:gap-x-10 gap-y-5 justify-center items-center">
      <div className="shadow-2xl h-max relative rounded-3xl dark:bg-primary-black bg-primary-white lg:w-1/3 w-1/2 p-5">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <div className="dark:text-white text-primary-grey text-center lg:text-3xl text-2xl">{loadingStudent ? <LoadingAnimation /> : countStudentActive + " "}</div>
            <div className="dark:text-white text-primary-grey opacity-50 text-center text-sm ">Mahasiswa</div>
          </div>
          <div className="dark:text-white text-primary-grey text-center lg:text-sm text-xs">Mahasiswa Aktif</div>
        </div>
      </div>
      <div className="shadow-2xl h-max relative rounded-3xl dark:bg-primary-black bg-primary-white lg:w-1/3 w-1/2 p-5">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <div className="dark:text-white text-primary-grey text-center lg:text-3xl text-2xl">{loadingStudent ? <LoadingAnimation /> : countStudentNonActive + " "}</div>
            <div className="dark:text-white text-primary-grey opacity-50 text-center text-sm ">Mahasiswa</div>
          </div>
          <div className="dark:text-white text-primary-grey text-center lg:text-sm text-xs">Mahasiswa Tidak Aktif</div>
        </div>
      </div>
      <div className="shadow-2xl h-max relative rounded-3xl dark:bg-primary-black bg-primary-white lg:w-1/3 w-1/2 p-5">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <div className="dark:text-white text-primary-grey text-center lg:text-3xl text-2xl">{loadingStudent ? <LoadingAnimation /> : countAllStudent + " "}</div>
            <div className="dark:text-white text-primary-grey opacity-50 text-center text-sm ">Mahasiswa</div>
          </div>
          <div className="dark:text-white text-primary-grey text-center lg:text-sm text-xs">Total Mahasiswa</div>
        </div>
      </div>
      <div className="shadow-2xl h-max relative rounded-3xl dark:bg-primary-black bg-primary-white lg:w-1/3 w-1/2 p-5">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <div className="dark:text-white text-primary-grey text-center lg:text-3xl text-2xl">{loadingLecturer ? <LoadingAnimation /> : countLecturer + " "}</div>
            <div className="dark:text-white text-primary-grey opacity-50 text-center text-sm  ">Dosen</div>
          </div>
          <div className="dark:text-white text-primary-grey text-center lg:text-sm text-xs">Total Dosen</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardListItem;
