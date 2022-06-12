import { gql } from "@apollo/client";

export const GET_STUDENTS_NONAKTIF = gql`
  subscription GetStudents($prodi: String!) {
    students(where: { is_active: { _eq: false }, _and: { study_programs_id: { _eq: $prodi } } }, order_by: { npm: asc }) {
      npm
      fullname
      study_program {
        study_program_name
      }
      is_active
    }
  }
`;
