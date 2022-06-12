import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  subscription GetStudents {
    students(order_by: { npm: asc }) {
      npm
      fullname
      study_program {
        study_program_name
      }
      is_active
    }
  }
`;