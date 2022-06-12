import { gql } from "@apollo/client";

export const GET_STUDENTS_SEARCH = gql`
  subscription GetStudentSearch($npm: String) {
    students(where: { npm: { _eq: $npm } }, order_by: { npm: asc }) {
      fullname
      npm
      is_active
      study_program {
        study_program_name
      }
    }
  }
`;
