import { gql } from "@apollo/client";

export const INSERT_STUDENTS = gql`
  mutation InsertStudents($students: [students_insert_input!]!) {
    insert_students(objects: $students) {
      returning {
        npm
        fullname
        is_active
        study_program {
          study_program_name
        }
        created_at
        update_at
      }
    }
  }
`;
