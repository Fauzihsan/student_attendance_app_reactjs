import { gql } from "@apollo/client";

export const GET_STUDENTS_AKTIF = gql`
  subscription GetStudents {
    students(where: { is_active: { _eq: true } }, order_by: { npm: asc }) {
      npm
      fullname
      study_program {
        study_program_name
      }
      is_active
    }
  }
`;
