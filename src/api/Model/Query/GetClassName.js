import { gql } from "@apollo/client";

export const GET_CLASS_NAMES = gql`
  query GetClassNames($prodi: String!) {
    class(order_by: { class_name: asc }, where: { study_programs_id: { _eq: $prodi } }) {
      id
      class_name
      study_program {
        study_program_name
      }
    }
  }
`;
