import { gql } from "@apollo/client";

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule($id: Int!, $course_id: String!, $class_id: Int!, $nidn: String!, $time: String!, $day: String!, $room: String!) {
    update_schedules_by_pk(pk_columns: { id: $id }, _set: { courses_id: $course_id, class_id: $class_id, nidn: $nidn, time: $time, day: $day, room: $room }) {
      id
    }
  }
`;
