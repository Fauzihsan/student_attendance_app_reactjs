import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { UPDATE_SCHEDULE } from "../../../../api/Model/Mutation/Update/UpdateSchedule";
import { useMutation, useQuery } from "@apollo/client/react";
import Swal from "sweetalert2";
import { FaRegWindowClose } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GET_CLASS_NAMES } from "../../../../api/Model/Query/GetClassName";
import { GET_COURSES } from "../../../../api/Model/Query/GetCourses";
import { GET_LECTURERS } from "../../../../api/Model/Query/GetLecturer";
import LoadingAnimation from "../../../Loading/LoadingAnimation";

function ModalUpdateSchedule({ data }) {
  const { id, time, day, room } = data;
  const id_prodi = useSelector((state) => state.prodi.id);
  const { data: dataClasses } = useQuery(GET_CLASS_NAMES, { variables: { prodi: id_prodi } });
  const { data: dataCourses } = useQuery(GET_COURSES, { variables: { prodi: id_prodi } });
  const { data: dataLecturers } = useQuery(GET_LECTURERS);
  const [showModal, setShowModal] = useState(false);

  const INITIAL_STATE = {
    id,
    course_id: data.course.course_id,
    class_id: data.class.id,
    nidn: data.lecturer.nidn,
    time,
    day,
    room,
  };

  const INITIAL_TIME = {
    start: "",
    end: "",
  };

  const [newTime, setNewTime] = useState(INITIAL_TIME);
  const [scheduleUpdate, setScheduleUpdate] = useState(INITIAL_STATE);

  const [updateSchedule, { loading }] = useMutation(UPDATE_SCHEDULE, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data berhasil diperbaharui",
        showConfirmButton: false,
        timer: 1200,
      });

      setShowModal(false);
      setIsUpdated(false);
    },
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const handleOnChange = (e) => {
    const NAME = e.target.name;
    const VALUE = e.target.value;

    setScheduleUpdate({ ...scheduleUpdate, [NAME]: VALUE });
    setIsUpdated(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (scheduleUpdate.course_id === data.course.course_id && scheduleUpdate.class_id === data.class.id && scheduleUpdate.nidn === data.lecturer.nidn && scheduleUpdate.time === time && scheduleUpdate.day === day && scheduleUpdate.room === room) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Tidak Ada Perubahan",
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      if (isUpdated) {
        updateSchedule({
          variables: {
            id,
            course_id: scheduleUpdate.course_id,
            class_id: parseInt(scheduleUpdate.class_id),
            nidn: scheduleUpdate.nidn,
            time: scheduleUpdate.time,
            day: scheduleUpdate.day,
            room: scheduleUpdate.room,
          },
        });
      }
    }
  };

  const handleTime = () => {
    let start = newTime.start;
    let end = newTime.end;

    setScheduleUpdate({ ...scheduleUpdate, time: start.concat(" - " + end) });
    setIsUpdated(true);
  };

  return (
    <>
      <button
        className="bg-secondary-yellow text-white hover:bg-yellow-500 p-2 rounded-md"
        onClick={() => {
          setShowModal(true);
          setScheduleUpdate(INITIAL_STATE);
          setNewTime(INITIAL_TIME);
        }}
      >
        <BsPencilSquare size={25} />
      </button>

      {showModal && (
        <div id="modalAdd" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Jadwal</h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="large-modal"
                >
                  <FaRegWindowClose id="cancel" className="w-8 dark:text-white text-primary-blue" size={25} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <form onSubmit={handleUpdate}>
                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      required
                      defaultValue={data.course.course_id}
                      name="course_id"
                      onChange={handleOnChange}
                      className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={""} disabled>
                        Pilih Mata Kuliah
                      </option>
                      {dataCourses?.courses.map((d) => (
                        <option key={d.course_id} value={d.course_id}>
                          {d.course_id} - {d.course_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      required
                      defaultValue={data.class.id}
                      name="class_id"
                      onChange={handleOnChange}
                      className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={""} disabled>
                        Pilih Kelas
                      </option>
                      {dataClasses?.class.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.class_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      required
                      defaultValue={data.lecturer.nidn}
                      name="nidn"
                      onChange={handleOnChange}
                      className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value={""} disabled>
                        Pilih Dosen Pengampu
                      </option>
                      {dataLecturers?.lecturers.map((d) => (
                        <option key={d.nidn} value={d.nidn}>
                          {d.fullname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="" className="text-primary-grey dark:text-white text-sm">
                      Waktu :
                    </label>
                    <div className="flex flex-row justify-center items-center gap-x-4">
                      <input
                        autoComplete="off"
                        type="time"
                        name="startTime"
                        value={newTime.start}
                        onChange={(e) => setNewTime({ ...newTime, start: e.target.value })}
                        className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <p className="text-primary-grey dark:text-white text-sm">s/d</p>
                      <input
                        autoComplete="off"
                        type="time"
                        name="endTime"
                        value={newTime.end}
                        onChange={(e) => setNewTime({ ...newTime, end: e.target.value })}
                        className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleTime}
                        className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                      >
                        SET
                      </button>
                      <input
                        autoComplete="off"
                        type="text"
                        name="time"
                        className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        value={scheduleUpdate.time}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      autoComplete="off"
                      required
                      defaultValue={day}
                      name="day"
                      onChange={handleOnChange}
                      className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled value="">
                        -- Pilih Hari --
                      </option>
                      <option value="Senin">Senin</option>
                      <option value="Selasa">Selasa</option>
                      <option value="Rabu">Rabu</option>
                      <option value="Kamis">Kamis</option>
                      <option value="Jumat">Jumat</option>
                      <option value="Sabtu">Sabtu</option>
                    </select>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      autoComplete="off"
                      required
                      defaultValue={room}
                      name="room"
                      onChange={handleOnChange}
                      className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled value="">
                        -- Pilih Ruangan --
                      </option>
                      <option value="F.T - 1.1">F.T - 1.1</option>
                      <option value="F.T - 1.2">F.T - 1.2</option>
                      <option value="F.T - 1.3">F.T - 1.3</option>
                      <option value="F.T - 1.4">F.T - 1.4</option>
                      <option value="F.T - 2.1">F.T - 2.1</option>
                      <option value="F.T - 2.2">F.T - 2.2</option>
                      <option value="F.T - 2.34">F.T - 2.34</option>
                      <option value="F.T - 3.1">F.T - 3.1</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button type="submit" className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                      {loading ? <LoadingAnimation /> : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalUpdateSchedule;
