import { gql } from "@apollo/client";

export const DELETE_COURSE = gql`
  mutation DeleteCourse($course_id: String!) {
    delete_courses_by_pk(course_id: $course_id) {
      course_id
    }
  }
`;
