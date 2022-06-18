import { gql } from "@apollo/client";

export const UPDATE_CLASS_NAME = gql`
  mutation UpdateClassName($id: Int!, $class_name: String!) {
    update_class_by_pk(pk_columns: { id: $id }, _set: { class_name: $class_name }) {
      id
      class_name
    }
  }
`;
