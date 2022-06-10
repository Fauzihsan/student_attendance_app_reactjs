import { gql } from "@apollo/client";

export const INSERT_USERS = gql`
  mutation InsertUsers($users: [users_insert_input!]!) {
    insert_users(objects: $users) {
      returning {
        username
        roles_id
      }
    }
  }
`;
