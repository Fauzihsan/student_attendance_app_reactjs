import React from "react";
import { useState } from "react";
import { BsDownload } from "react-icons/bs";
import { FaRegWindowClose } from "react-icons/fa";
import FilterMeetNumber from "../FilterMeetNumber";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GET_ATTENDANCES_ALL } from "../../api/Model/Subscription/GetAttendances";
import { useSubscription } from "@apollo/client";
import * as XLSX from "xlsx";
import { FILTER_MEET_NUMBER } from "../../redux/filterSlice";

function ExportAttendance({ data }) {
  const [showModal, setShowModal] = useState(false);

  const meeting = useSelector((state) => state.filter.meet_number);
  const dispatch = useDispatch();

  const [allData, setAllData] = useState([]);
  const [dataMeet, setDataMeet] = useState([]);
  const { data: dataAllAttendance } = useSubscription(GET_ATTENDANCES_ALL, { variables: { schedules_id: data.id } });

  useEffect(() => {
    setDataMeet([]);
    if (meeting === "1") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_1: d.p_1 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "2") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_2: d.p_2 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "3") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_3: d.p_3 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "4") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_4: d.p_4 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "5") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_5: d.p_5 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "6") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_6: d.p_6 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "7") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_7: d.p_7 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "8") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_8: d.p_8 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "9") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_9: d.p_9 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "10") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_10: d.p_10 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "11") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_11: d.p_11 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "12") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_12: d.p_12 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "13") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_13: d.p_13 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    } else if (meeting === "14") {
      dataAllAttendance?.attendances.map((d) =>
        setDataMeet((dataMeet) => [
          ...dataMeet,
          {
            npm: d.student.npm,
            name: d.student.fullname,
            pertemuan_14: d.p_14 === 0 ? "Tidak Hadir" : "Hadir",
          },
        ])
      );
    }
  }, [meeting, dataAllAttendance?.attendances]);

  useEffect(() => {
    setAllData([]);
    dataAllAttendance?.attendances.map((d) =>
      setAllData((allData) => [
        ...allData,
        {
          npm: d.student.npm,
          name: d.student.fullname,
          pertemuan_1: d.p_1 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_2: d.p_2 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_3: d.p_3 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_4: d.p_4 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_5: d.p_5 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_6: d.p_6 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_7: d.p_7 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_8: d.p_8 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_9: d.p_9 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_10: d.p_10 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_11: d.p_11 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_12: d.p_12 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_13: d.p_13 === 0 ? "Tidak Hadir" : "Hadir",
          pertemuan_14: d.p_14 === 0 ? "Tidak Hadir" : "Hadir",
        },
      ])
    );
  }, [dataAllAttendance?.attendances]);

  const exportAll = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(allData);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "Absensi " + data.class.class_name + " " + data.course.course_name + ".xlsx");
  };
  const exportMeet = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dataMeet);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "Absensi Pertemuan-" + meeting + " " + data.class.class_name + " " + data.course.course_name + ".xlsx");
  };

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary-blue rounded-lg hover:bg-secondary-blue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary-blue dark:hover:bg-secondary-blue dark:focus:ring-blue-800"
      >
        Unduh
        <BsDownload className="ml-2 -mr-1 w-4 h-4" />
      </button>

      {showModal && (
        <div id="modalAddStudenttoClass" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 mx-auto w-full max-w-6xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Unduh Absensi {data.class.class_name} - {data.course.course_name}
                </h3>

                <button
                  onClick={() => {
                    setShowModal(false);
                    dispatch(FILTER_MEET_NUMBER("1"));
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="large-modal"
                >
                  <FaRegWindowClose id="cancel" className="w-8 dark:text-white text-primary-blue" size={25} />
                </button>
              </div>
              <div className="flex lg:flex-row flex-col px-6 py-2 item-center justify-center gap-3">
                <div className="flex flex-col gap-y-5 items-center lg:p-6 px-1 py-6 lg:w-[60%] w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <FilterMeetNumber />
                  <button
                    onClick={exportMeet}
                    className="flex w-full justify-center py-2 px-3 text-sm font-medium text-center text-white bg-primary-blue rounded-lg hover:bg-secondary-blue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary-blue dark:hover:bg-secondary-blue dark:focus:ring-blue-800"
                  >
                    Unduh Excel Pertemuan {meeting}
                    <BsDownload className="ml-2 -mr-1 w-4 h-4" />
                  </button>
                </div>
                <div className="lg:px-6 px-1 py-11 lg:w-[40%] w-full flex flex-col items-center gap-y-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Unduh Semua Pertemuan</h5>
                  <button
                    onClick={exportAll}
                    className="flex w-full justify-center py-2 px-3 text-sm font-medium text-center text-white bg-primary-blue rounded-lg hover:bg-secondary-blue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-primary-blue dark:hover:bg-secondary-blue dark:focus:ring-blue-800"
                  >
                    Unduh Semua Pertemuan
                    <BsDownload className="ml-2 -mr-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExportAttendance;
