import React from "react";
import { useDispatch } from "react-redux";
import { FILTER_CATEGORY } from "../../redux/filterSlice";

function FilterStudents() {
  const dispatch = useDispatch();

  return (
    <div className="lg:w-1/2 w-full px-3 py-2 flex flex-row items-center gap-x-2">
      <label htmlFor="" className="text-primary-grey dark:text-white text-sm">
        Filter
      </label>
      <select
        defaultValue={"all"}
        name="filter"
        onChange={(e) => {
          dispatch(FILTER_CATEGORY(e.target.value));
        }}
        className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={"all"}>Semua Mahasiswa</option>
        <option value={"aktif"}>Mahasiswa Aktif</option>
        <option value={"tidak_aktif"}>Mahasiswa Tidak Aktif</option>
      </select>
    </div>
  );
}

export default FilterStudents;
