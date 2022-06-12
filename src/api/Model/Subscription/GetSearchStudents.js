import { gql } from "@apollo/client";

export const GET_STUDENTS_SEARCH = gql`
  subscription GetStudentSearch($npm: String!, $prodi: String!) {
    students(where: { npm: { _eq: $npm }, _and: { study_programs_id: { _eq: $prodi } } }, order_by: { npm: asc }) {
      fullname
      npm
      is_active
      study_program {
        study_program_name
      }
    }
  }
`;
