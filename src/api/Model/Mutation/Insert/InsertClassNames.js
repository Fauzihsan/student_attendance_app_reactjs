import { gql } from "@apollo/client";

export const INSERT_CLASS_NAME = gql`
  mutation InsertClassName($class_name: String!, $study_programs_id: String!) {
    insert_class_names(objects: { class_name: $class_name, study_programs_id: $study_programs_id }) {
      returning {
        id
      }
    }
  }
`;
