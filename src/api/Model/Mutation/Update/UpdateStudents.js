import { gql } from "@apollo/client";

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($fullname: String!, $is_active: Boolean!, $npm: String!) {
    update_students(_set: { fullname: $fullname, is_active: $is_active }, where: { npm: { _eq: $npm } }) {
      returning {
        fullname
        is_active
        npm
      }
    }
  }
`;
