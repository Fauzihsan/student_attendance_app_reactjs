import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { INSERT_SCHEDULE } from "../../../api/Model/Mutation/Insert/insertSchedule";
import { GET_CLASS_NAMES } from "../../../api/Model/Query/GetClassName";
import { GET_COURSES } from "../../../api/Model/Query/GetCourses";
import { GET_LECTURERS } from "../../../api/Model/Query/GetLecturer";
import LoadingAnimation from "../../Loading/LoadingAnimation";

function FormSchedule() {
  const { data: dataClasses, loading: loadingClasses } = useQuery(GET_CLASS_NAMES);
  const { data: dataCourses, loading: loadingCourses } = useQuery(GET_COURSES);
  const { data: dataLecturers, loading: loadingLecturers } = useQuery(GET_LECTURERS);

  const INITIAL_STATE = {
    course_id: "",
    class_id: "",
    nidn: "",
    time: "",
    day: "",
    room: "",
  };

  const INITIAL_TIME = {
    start: "",
    end: "",
  };

  const [schedule, setSchedule] = useState(INITIAL_STATE);
  const [time, setTime] = useState(INITIAL_TIME);

  const [insertSchedule, { loading: loadingInsert }] = useMutation(INSERT_SCHEDULE, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Jadwal berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1200,
      });

      setSchedule(INITIAL_STATE);
    },
  });

  const handleInput = (e) => {
    e.preventDefault();
    insertSchedule({
      variables: {
        courses_id: schedule.course_id,
        class_id: schedule.class_id,
        nidn: schedule.nidn,
        time: schedule.time,
        day: schedule.day,
        room: schedule.room,
      },
    });
  };

  const handleOnChange = (e) => {
    const VALUE = e.target.value;
    const NAME = e.target.name;
    setSchedule({ ...schedule, [NAME]: VALUE });
  };

  const handleTime = () => {
    let start = time.start;
    let end = time.end;

    setSchedule({ ...schedule, time: start.concat(" - " + end) });
  };

  return loadingClasses && loadingCourses && loadingLecturers ? (
    <LoadingAnimation />
  ) : (
    <form onSubmit={handleInput}>
      <div className="relative z-0 w-full mb-6 group">
        <label htmlFor="" className="text-primary-grey dark:text-white text-sm">
          Pilih Mata Kuliah
        </label>
        <input
          autoComplete="off"
          name="course_id"
          required
          type="text"
          list="courses"
          onChange={handleOnChange}
          className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <datalist id="courses" className="w-full">
          {dataCourses?.courses.map((d) => (
            <option key={d.course_id} value={d.course_id}>
              {d.course_name}
            </option>
          ))}
        </datalist>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label htmlFor="" className="text-primary-grey dark:text-white text-sm">
          Pilih Kelas
        </label>
        <input
          autoComplete="off"
          name="class_id"
          required
          type="text"
          list="classes"
          onChange={handleOnChange}
          className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <datalist id="classes">
          {dataClasses?.class.map((d) => (
            <option key={d.id} value={d.id}>
              {d.class_name}
            </option>
          ))}
        </datalist>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label htmlFor="" className="text-primary-grey dark:text-white text-sm">
          Pilih Dosen Pengampu
        </label>
        <input
          autoComplete="off"
          required
          name="nidn"
          type="text"
          list="lecturer"
          onChange={handleOnChange}
          className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <datalist id="lecturer">
          {dataLecturers?.lecturers.map((d) => (
            <option key={d.nidn} value={d.nidn}>
              {d.fullname}
            </option>
          ))}
        </datalist>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label htmlFor="" className="text-primary-grey dark:text-white text-sm">
          Waktu :
        </label>
        <div className="flex flex-row justify-center items-center gap-x-4">
          <input
            autoComplete="off"
            type="time"
            required
            name="startTime"
            defaultValue={time.start}
            onChange={(e) => setTime({ ...time, start: e.target.value })}
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="text-primary-grey dark:text-white text-sm">s/d</p>
          <input
            autoComplete="off"
            type="time"
            required
            name="endTime"
            defaultValue={time.end}
            onChange={(e) => setTime({ ...time, end: e.target.value })}
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button type="button" onClick={handleTime} className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
            SET
          </button>
          <input
            autoComplete="off"
            type="text"
            name="time"
            className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            defaultValue={schedule.time}
            required
          />
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <select
          autoComplete="off"
          required
          value={schedule.day}
          name="day"
          onChange={handleOnChange}
          className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected disabled value="">
            -- Pilih Hari --
          </option>
          <option value={"Senin"}>Senin</option>
          <option value={"Selasa"}>Selasa</option>
          <option value={"Rabu"}>Rabu</option>
          <option value={"Kamis"}>Kamis</option>
          <option value={"Jumat"}>Jumat</option>
          <option value={"Sabtu"}>Sabtu</option>
        </select>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <select
          autoComplete="off"
          required
          value={schedule.room}
          name="room"
          onChange={handleOnChange}
          className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected disabled value="">
            -- Pilih Ruangan --
          </option>
          <option value={"F.T - 1.1"}>F.T - 1.1</option>
          <option value={"F.T - 1.2"}>F.T - 1.2</option>
          <option value={"F.T - 1.3"}>F.T - 1.3</option>
          <option value={"F.T - 1.4"}>F.T - 1.4</option>
          <option value={"F.T - 2.1"}>F.T - 2.1</option>
          <option value={"F.T - 2.2"}>F.T - 2.2</option>
          <option value={"F.T - 2.34"}>F.T - 2.34</option>
          <option value={"F.T - 3.1"}>F.T - 3.1</option>
        </select>
      </div>

      <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button type="submit" className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
          {loadingInsert ? <LoadingAnimation /> : "Tambahkan"}
        </button>
      </div>
    </form>
  );
}

export default FormSchedule;
