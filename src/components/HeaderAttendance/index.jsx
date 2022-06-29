import React from "react";

function HeaderAttendance({ schedule_data }) {
  return (
    <div className="block p-6 text-xs w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <table className="lg:w-3/4 md:w-3/4 w-full">
        <tbody>
          <tr>
            <td className="w-1/6 py-2">
              <p className="text-gray-700 dark:text-gray-400">Mata Kuliah</p>
            </td>
            <td>:</td>
            <td>
              <p className="text-gray-700 dark:text-gray-400">{schedule_data.course.course_name}</p>
            </td>
            <td className="w-1/6 py-2">
              <p className="text-gray-700 dark:text-gray-400">Hari</p>
            </td>
            <td>:</td>
            <td>
              <p className="text-gray-700 dark:text-gray-400">{schedule_data.day}</p>
            </td>
          </tr>
          <tr>
            <td className="w-1/6 py-2">
              <p className="text-gray-700 dark:text-gray-400">Kelas</p>
            </td>
            <td>:</td>
            <td>
              <p className="text-gray-700 dark:text-gray-400">{schedule_data.class.class_name}</p>
            </td>
            <td className="w-1/6 py-2">
              <p className="text-gray-700 dark:text-gray-400">Waktu</p>
            </td>
            <td>:</td>
            <td>
              <p className="text-gray-700 dark:text-gray-400">{schedule_data.time}</p>
            </td>
          </tr>

          <tr>
            <td className="w-1/6 py-2">
              <p className="text-gray-700 dark:text-gray-400">Pertemuan</p>
            </td>
            <td>:</td>
            <td>
              <p className="text-gray-700 dark:text-gray-400">{schedule_data.meet_number}</p>
            </td>
            <td className="w-1/6 py-2">
              <p className="text-gray-700 dark:text-gray-400">Ruangan</p>
            </td>
            <td>:</td>
            <td>
              <p className="text-gray-700 dark:text-gray-400">{schedule_data.room}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HeaderAttendance;
