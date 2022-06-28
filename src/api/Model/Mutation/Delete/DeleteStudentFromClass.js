import { gql } from "@apollo/client";

export const DELETE_STUDENT_FROM_CLASS = gql`
  mutation DeleteStudentFromClass($npm: String!) {
    delete_attendances(where: { npm: { _eq: $npm } }) {
      returning {
        npm
      }
    }
  }
`;
