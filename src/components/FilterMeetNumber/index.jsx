import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_MEET_NUMBER } from "../../redux/filterSlice";

function FilterMeetNumber() {
  const dispatch = useDispatch();
  const meet = useSelector((state) => state.filter.meet_number);

  return (
    <div className="w-full px-3 py-2 flex flex-row items-center gap-x-2">
      <label htmlFor="" className="w-max px-5 text-primary-grey dark:text-white text-sm">
        Pilih Pertemuan
      </label>
      <select
        defaultValue={"1"}
        name="filter"
        onChange={(e) => {
          dispatch(FILTER_MEET_NUMBER(e.target.value));
        }}
        className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={"1"}>Pertemuan 1</option>
        <option value={"2"}>Pertemuan 2</option>
        <option value={"3"}>Pertemuan 3</option>
        <option value={"4"}>Pertemuan 4</option>
        <option value={"5"}>Pertemuan 5</option>
        <option value={"6"}>Pertemuan 6</option>
        <option value={"7"}>Pertemuan 7</option>
        <option value={"8"}>Pertemuan 8</option>
        <option value={"9"}>Pertemuan 9</option>
        <option value={"10"}>Pertemuan 10</option>
        <option value={"11"}>Pertemuan 11</option>
        <option value={"12"}>Pertemuan 12</option>
        <option value={"13"}>Pertemuan 13</option>
        <option value={"14"}>Pertemuan 14</option>
      </select>
    </div>
  );
}

export default FilterMeetNumber;
