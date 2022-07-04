import { gql } from "@apollo/client";

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($npm: String!) {
    delete_students_by_pk(npm: $npm) {
      npm
    }
  }
`;
