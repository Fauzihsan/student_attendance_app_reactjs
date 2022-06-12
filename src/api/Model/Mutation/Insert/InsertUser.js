import { gql } from "@apollo/client";

export const INSERT_USER = gql`
  mutation InsertUser($user: users_insert_input!) {
    insert_users_one(object: $user) {
      id
    }
  }
`;
