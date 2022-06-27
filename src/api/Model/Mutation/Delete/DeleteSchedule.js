import { gql } from "@apollo/client";

export const DELETE_SCHEDULE = gql`
  mutation DeleteSchedule($id: Int!) {
    delete_schedules_by_pk(id: $id) {
      id
    }
  }
`;
