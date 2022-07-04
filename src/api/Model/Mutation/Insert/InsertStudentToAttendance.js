import { gql } from "@apollo/client";

export const INSERT_STUDENTS_TO_ATTENDANCE = gql`
  mutation InsertStudentToAttendance($schedules_id: Int!, $npm: String!) {
    insert_attendances(objects: { npm: $npm, schedules_id: $schedules_id }) {
      returning {
        id
      }
    }
  }
`;
