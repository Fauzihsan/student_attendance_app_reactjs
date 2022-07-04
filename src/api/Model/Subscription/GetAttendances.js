import { gql } from "@apollo/client";

export const GET_ATTENDANCES = gql`
  subscription GetAttendances($schedules_id: Int!) {
    attendances(where: { schedules_id: { _eq: $schedules_id } }, order_by: { npm: asc }) {
      student {
        npm
        fullname
      }
      p_1
      p_2
      p_3
      p_4
      p_5
      p_6
      p_7
      p_8
      p_9
      p_10
      p_11
      p_12
      p_13
      p_14
    }
  }
`;
