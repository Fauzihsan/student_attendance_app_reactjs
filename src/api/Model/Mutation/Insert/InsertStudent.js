import { gql } from "@apollo/client";

export const INSERT_STUDENT = gql`
  mutation InsertStudent($student: students_insert_input!) {
    insert_students_one(object: $student) {
      npm
    }
  }
`;
