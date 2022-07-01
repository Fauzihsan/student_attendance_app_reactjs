import { useMutation, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ATTENDANCES } from "../../../api/Model/Subscription/GetAttendances";
import LoadingAnimationXL from "../../Loading/LoadingAnimationXL";
import {
  UPDATE_ATTENDANCE_P1,
  UPDATE_ATTENDANCE_P10,
  UPDATE_ATTENDANCE_P11,
  UPDATE_ATTENDANCE_P12,
  UPDATE_ATTENDANCE_P13,
  UPDATE_ATTENDANCE_P14,
  UPDATE_ATTENDANCE_P2,
  UPDATE_ATTENDANCE_P3,
  UPDATE_ATTENDANCE_P4,
  UPDATE_ATTENDANCE_P5,
  UPDATE_ATTENDANCE_P6,
  UPDATE_ATTENDANCE_P7,
  UPDATE_ATTENDANCE_P8,
  UPDATE_ATTENDANCE_P9,
} from "../../../api/Model/Mutation/Update/UpdateAttendance";
import LoadingAnimation from "../../Loading/LoadingAnimation";
import { MODAL_IS_PRESENT } from "../../../redux/modalSlice";

function AttendanceTable({ schedule_data, role }) {
  const dispatch = useDispatch();
  let meeting = "";
  const meetFilter = useSelector((state) => state.filter.meet_number);
  if (role === "lecturer") {
    meeting = schedule_data.meet_number.toString();
  } else {
    meeting = meetFilter;
  }
  const { data, loading } = useSubscription(GET_ATTENDANCES, { variables: { schedules_id: schedule_data.id } });
  const [attendances, setAttendances] = useState([]);
  const [attendanceIndex, setAttendanceIndex] = useState("");

  const [meetNumber, setMeetNumber] = useState(UPDATE_ATTENDANCE_P1);
  const [updatePresent, { loading: loadingPresent }] = useMutation(meetNumber);
  const [updateAbsent, { loading: loadingAbsent }] = useMutation(meetNumber);

  useEffect(() => {
    setAttendances([]);
    !loading &&
      data?.attendances.forEach((attendance) => {
        setAttendances((attendances) => [
          ...attendances,
          {
            npm: attendance.student.npm,
            fullname: attendance.student.fullname,
            p1: attendance.p_1,
            p2: attendance.p_2,
            p3: attendance.p_3,
            p4: attendance.p_4,
            p5: attendance.p_5,
            p6: attendance.p_6,
            p7: attendance.p_7,
            p8: attendance.p_8,
            p9: attendance.p_9,
            p10: attendance.p_10,
            p11: attendance.p_11,
            p12: attendance.p_12,
            p13: attendance.p_13,
            p14: attendance.p_14,
          },
        ]);
      });
  }, [data, loading]);

  useEffect(() => {
    if (meeting === "1") {
      setMeetNumber(UPDATE_ATTENDANCE_P1);
    } else if (meeting === "2") {
      setMeetNumber(UPDATE_ATTENDANCE_P2);
    } else if (meeting === "3") {
      setMeetNumber(UPDATE_ATTENDANCE_P3);
    } else if (meeting === "4") {
      setMeetNumber(UPDATE_ATTENDANCE_P4);
    } else if (meeting === "5") {
      setMeetNumber(UPDATE_ATTENDANCE_P5);
    } else if (meeting === "6") {
      setMeetNumber(UPDATE_ATTENDANCE_P6);
    } else if (meeting === "7") {
      setMeetNumber(UPDATE_ATTENDANCE_P7);
    } else if (meeting === "8") {
      setMeetNumber(UPDATE_ATTENDANCE_P8);
    } else if (meeting === "9") {
      setMeetNumber(UPDATE_ATTENDANCE_P9);
    } else if (meeting === "10") {
      setMeetNumber(UPDATE_ATTENDANCE_P10);
    } else if (meeting === "11") {
      setMeetNumber(UPDATE_ATTENDANCE_P11);
    } else if (meeting === "12") {
      setMeetNumber(UPDATE_ATTENDANCE_P12);
    } else if (meeting === "13") {
      setMeetNumber(UPDATE_ATTENDANCE_P13);
    } else if (meeting === "14") {
      setMeetNumber(UPDATE_ATTENDANCE_P14);
    }
  }, [meeting]);

  const handlePresent = (npm, index) => {
    updatePresent({
      variables: {
        status: 1,
        npm,
      },
    });
    setAttendanceIndex(index);
    dispatch(MODAL_IS_PRESENT(true));
  };

  const handleAbsent = (npm, index) => {
    updateAbsent({
      variables: {
        status: 0,
        npm,
      },
    });
    setAttendanceIndex(index);
  };

  return (
    <div className="relative h-96 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-primary-white2 dark:bg-primary-black dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              NPM
            </th>
            <th scope="col" className="px-6 py-3">
              Nama
            </th>

            <th scope="col" className="px-6 w-1/4 py-3 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} rowSpan={6}>
                <LoadingAnimationXL />
              </td>
            </tr>
          ) : attendances.length !== 0 ? (
            attendances.map((attendance, index) => (
              <tr key={attendance.npm} className="dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-primary-white2 dark:hover:bg-gray-700">
                <td className="px-6 py-4">{attendance.npm}</td>
                <td className="px-6 py-4">{attendance.fullname}</td>
                <td className="px-6 py-4 w-full flex justify-center text-white">
                  {meeting === "1" ? (
                    <div>
                      {attendance.p1 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "2" ? (
                    <div>
                      {attendance.p2 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "3" ? (
                    <div>
                      {attendance.p3 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "4" ? (
                    <div>
                      {attendance.p4 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "5" ? (
                    <div>
                      {attendance.p5 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "6" ? (
                    <div>
                      {attendance.p6 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "7" ? (
                    <div>
                      {attendance.p7 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "8" ? (
                    <div>
                      {attendance.p8 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "9" ? (
                    <div>
                      {attendance.p9 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "10" ? (
                    <div>
                      {attendance.p10 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "11" ? (
                    <div>
                      {attendance.p11 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "12" ? (
                    <div>
                      {attendance.p12 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : meeting === "13" ? (
                    <div>
                      {attendance.p13 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {attendance.p14 === 0 ? (
                        <button className="bg-secondary-red p-2 rounded-md" onClick={() => handlePresent(attendance.npm, index)}>
                          {loadingPresent && attendanceIndex === index ? <LoadingAnimation /> : "Tidak Hadir"}
                        </button>
                      ) : (
                        <button className="bg-secondary-blue p-2 rounded-md" onClick={() => handleAbsent(attendance.npm, index)}>
                          {loadingAbsent && attendanceIndex === index ? <LoadingAnimation /> : "Hadir"}
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <p className="text-center py-3">Data Mahasiswa Kosong</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
