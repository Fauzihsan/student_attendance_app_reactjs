import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($npm: String!) {
    delete_users(where: { username: { _eq: $npm } }) {
      returning {
        username
      }
    }
  }
`;
