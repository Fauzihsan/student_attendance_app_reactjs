import { gql } from "@apollo/client";

export const INSERT_SCHEDULE = gql`
  mutation InsertSchedule($courses_id: String!, $class_id: Int!, $nidn: String!, $time: String!, $day: String!, $room: String!) {
    insert_schedules(objects: { courses_id: $courses_id, class_id: $class_id, nidn: $nidn, time: $time, day: $day, room: $room }) {
      returning {
        id
      }
    }
  }
`;
