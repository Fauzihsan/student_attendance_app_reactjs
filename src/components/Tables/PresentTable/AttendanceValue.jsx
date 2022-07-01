import React from "react";
import { CgCloseO } from "react-icons/cg";
import { BsCheckCircle } from "react-icons/bs";

function AttendanceValue({ data }) {
  return (
    <>
      {data?.attendances.map((d) => (
        <tr>
          {d.p_1 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_2 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_3 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_4 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_5 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_6 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_7 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_8 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_9 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_10 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_11 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_12 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_13 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
          {d.p_14 === 0 ? (
            <td className="bg-secondary-red py-2">
              <CgCloseO size={20} className="mx-auto text-white" />
            </td>
          ) : (
            <td className="bg-green-400 py-2">
              <BsCheckCircle size={20} className="mx-auto text-white" />
            </td>
          )}
        </tr>
      ))}
    </>
  );
}

export default AttendanceValue;
