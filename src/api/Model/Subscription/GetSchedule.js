import { gql } from "@apollo/client";

export const GET_SCHEDULE = gql`
  subscription GetSchedule {
    schedules {
      id
      course {
        course_id
        course_name
      }
      class {
        class_name
      }
      lecturer {
        fullname
      }
      day
      room
      time
    }
  }
`;
