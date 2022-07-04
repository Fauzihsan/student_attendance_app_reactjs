import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($fullname: String = "", $password: String = "", $username: String!) {
    update_users(_set: { fullname: $fullname, password: $password }, where: { username: { _eq: $username } }) {
      returning {
        id
      }
    }
  }
`;
