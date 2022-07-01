import { gql } from "@apollo/client";

export const GET_ATTENDANCES_STUDENT = gql`
  subscription GetAttendanceStudents($schedules_id: Int!, $npm: String!) {
    attendances(where: { schedules_id: { _eq: $schedules_id }, _and: { npm: { _eq: $npm } } }, order_by: { npm: asc }) {
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
