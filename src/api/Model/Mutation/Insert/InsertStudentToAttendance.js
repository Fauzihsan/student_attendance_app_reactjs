import { gql } from "@apollo/client";

export const INSERT_STUDENTS_TO_ATTENDANCE = gql`
  mutation InsertStudentToAttendance($students: [attendances_insert_input!]!) {
    insert_attendances(objects: $students) {
      returning {
        id
      }
    }
  }
`;
