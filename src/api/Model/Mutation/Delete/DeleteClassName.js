import { gql } from "@apollo/client";

export const DELETE_CLASS_NAME = gql`
  mutation DeleteClassName($id: Int!) {
    delete_class_by_pk(id: $id) {
      id
      class_name
    }
  }
`;
