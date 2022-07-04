import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($username: String!, $password: String!) {
    users(limit: 1, where: { username: { _eq: $username }, password: { _eq: $password } }) {
      id
      fullname
      username
      password
      roles_id
      created_at
      updated_at
    }
  }
`;
