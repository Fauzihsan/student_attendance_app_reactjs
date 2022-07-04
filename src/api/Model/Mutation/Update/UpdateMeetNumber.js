import { gql } from "@apollo/client";

export const UPDATE_MEET_NUMBER = gql`
  mutation UpdateSchedule($id: Int!, $meet_number: Int!) {
    update_schedules_by_pk(pk_columns: { id: $id }, _set: { meet_number: $meet_number }) {
      id
    }
  }
`;
