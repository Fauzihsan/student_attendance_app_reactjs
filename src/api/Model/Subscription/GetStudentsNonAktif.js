import { gql } from "@apollo/client";

export const GET_STUDENTS_NONAKTIF = gql`
  subscription GetStudents {
    students(where: { is_active: { _eq: false } }, order_by: { npm: asc }) {
      npm
      fullname
      study_program {
        study_program_name
      }
      is_active
    }
  }
`;
