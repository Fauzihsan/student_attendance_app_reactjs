import React from "react";
import { useSubscription } from "@apollo/client";
import { useSelector } from "react-redux";
import UpdateClassNameModal from "../../Modal/ModalUpdate/ModalUpdateClassName";
import LoadingAnimationXL from "../../Loading/LoadingAnimationXL";
import ModalDelete from "../../Modal/ModalDelete";
import ModalAddStudentToClass from "../../Modal/ModalAddStudentToAttendance";
import ModalDetailClass from "../../Modal/ModalDetailClass";
import { GET_SCHEDULE } from "../../../api/Model/Subscription/GetSchedule";

function ScheduleTable() {
  const id_prodi = useSelector((state) => state.prodi.id);
  const { data, loading } = useSubscription(GET_SCHEDULE, { variables: { prodi: id_prodi } });
  let no = 1;

  return (
    <>
      <div className="relative h-80 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-primary-white2 dark:bg-primary-black dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Kode Matkul
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Matkul
              </th>
              <th scope="col" className="px-6 py-3">
                Kelas
              </th>
              <th scope="col" className="px-6 py-3">
                Prodi
              </th>
              <th scope="col" className="px-6 py-3">
                Dosen
              </th>
              <th scope="col" className="px-6 py-3">
                Hari
              </th>
              <th scope="col" className="px-6 py-3">
                Jam
              </th>
              <th scope="col" className="px-6 py-3">
                Ruangan
              </th>
              <th scope="col" className="px-6 py-3">
                Pertemuan
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} rowSpan={6}>
                  <LoadingAnimationXL />
                </td>
              </tr>
            ) : data?.schedules.length !== 0 ? (
              data?.schedules.map((d) => (
                <tr key={d.id} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">{no++}</td>
                  <td className="px-6 py-4">{d.course.course_id}</td>
                  <td className="px-6 py-4">{d.course.course_name}</td>
                  <td className="px-6 py-4">{d.class.class_name}</td>
                  <td className="px-6 py-4">{d.class.study_program.study_program_name}</td>
                  <td className="px-6 py-4">{d.lecturer.fullname}</td>
                  <td className="px-6 py-4">{d.day}</td>
                  <td className="px-6 py-4">{d.time}</td>
                  <td className="px-6 py-4">{d.room}</td>
                  <td className="px-6 py-4">{d.meet_number}</td>
                  <td className="flex flex-row justify-center gap-x-1 pt-2">
                    <ModalDetailClass data={d} />
                    <ModalAddStudentToClass data={d} />
                    <UpdateClassNameModal data={d} />
                    <ModalDelete data={d} type={"class"} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11}>
                  <p className="text-center py-3">BELUM ADA JADWAL</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ScheduleTable;
