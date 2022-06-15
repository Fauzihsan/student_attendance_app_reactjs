import { gql } from "@apollo/client";

export const DELETE_LECTURER = gql`
  mutation DeleteLecturer($nidn: String!) {
    delete_lecturers_by_pk(nidn: $nidn) {
      nidn
    }
  }
`;
