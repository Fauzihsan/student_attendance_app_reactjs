import { gql } from "@apollo/client";

export const DELETE_STUDENT_FROM_CLASS = gql`
  mutation DeleteStudentFromClass($npm: String!, $schedules_id: Int!) {
    delete_attendances(where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
