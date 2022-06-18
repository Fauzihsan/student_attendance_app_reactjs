import { gql } from "@apollo/client";

export const INSERT_STUDENTS_TO_CLASS = gql`
  mutation InsertStudentToClass($students: [students_insert_input!]!) {
    insert_classes(objects: $students) {
      returning {
        id
        class_id
        npm
      }
    }
  }
`;
