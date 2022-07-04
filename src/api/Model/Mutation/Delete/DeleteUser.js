import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($username: String!) {
    delete_users(where: { username: { _eq: $username } }) {
      returning {
        username
      }
    }
  }
`;
