import { gql } from "@apollo/client";

export const INSERT_COURSE = gql`
  mutation InsertCourse($course_id: String!, $course_name: String!, $sks: bpchar!, $study_programs_id: String!) {
    insert_courses(objects: { course_id: $course_id, course_name: $course_name, sks: $sks, study_programs_id: $study_programs_id }) {
      returning {
        course_id
      }
    }
  }
`;
