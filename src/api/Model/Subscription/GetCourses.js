import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  subscription GetCourses($prodi: String!) {
    courses(order_by: { course_name: asc }, where: { study_programs_id: { _eq: $prodi } }) {
      course_id
      course_name
      sks
    }
  }
`;
