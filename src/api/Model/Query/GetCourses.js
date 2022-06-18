import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query GetCourses {
    courses(order_by: { course_name: asc }) {
      course_id
      course_name
      sks
    }
  }
`;
