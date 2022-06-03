import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($email: String!, $password: String!) {
    users(limit: 1, where: { email: { _eq: $email }, password: { _eq: $password } }) {
      id
      fullname
      email
      password
      created_at
      updated_at
    }
  }
`;
