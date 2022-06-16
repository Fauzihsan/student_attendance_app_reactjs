import { gql } from "@apollo/client";

export const GET_CLASS_NAMES = gql`
  subscription GetClassNames {
    class_names(order_by: { class_name: asc }) {
      id
      class_name
      study_program {
        study_program_name
      }
    }
  }
`;
