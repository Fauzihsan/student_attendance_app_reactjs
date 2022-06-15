import { gql } from "@apollo/client";

export const INSERT_LECTURER = gql`
  mutation InsertLecturer($lecturer: lecturers_insert_input!) {
    insert_lecturers_one(object: $lecturer) {
      nidn
    }
  }
`;
