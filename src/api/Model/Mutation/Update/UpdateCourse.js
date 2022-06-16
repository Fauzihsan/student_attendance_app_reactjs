import { gql } from "@apollo/client";

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($course_id: String!, $course_name: String!, $sks: bpchar!) {
    update_courses_by_pk(pk_columns: { course_id: $course_id }, _set: { course_name: $course_name, sks: $sks }) {
      course_id
      course_name
      sks
    }
  }
`;
