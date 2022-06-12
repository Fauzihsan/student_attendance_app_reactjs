import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  subscription GetStudents($prodi: String!) {
    students(order_by: { npm: asc }, where: { study_programs_id: { _eq: $prodi } }) {
      npm
      fullname
      study_program {
        study_program_name
      }
      is_active
    }
  }
`;
