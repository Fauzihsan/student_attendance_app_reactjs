import { gql } from "@apollo/client";

export const GET_ONE_USER = gql`
  query GetOneUser($username: String!) {
    users(where: { username: { _eq: $username } }) {
      id
      role {
        name
      }
      fullname
    }
  }
`;
