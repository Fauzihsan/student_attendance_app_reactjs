import { gql } from "@apollo/client";

export const GET_SCHEDULE_BY_STUDENT = gql`
  subscription GetScheduleStudent($npm: String!) {
    schedules(where: { attendances: { npm: { _eq: $npm } } }) {
      id
      time
      room
      day
      course {
        course_name
      }
      class {
        class_name
      }
      meet_number
      lecturer {
        fullname
        nidn
      }
    }
  }
`;
