import { gql } from "@apollo/client";

export const INSERT_COURSE = gql`
  mutation InsertCourse($course_id: String!, $course_name: String!, $sks: bpchar!) {
    insert_courses(objects: { course_id: $course_id, course_name: $course_name, sks: $sks }) {
      returning {
        course_id
      }
    }
  }
`;
