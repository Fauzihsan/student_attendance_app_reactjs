import { gql } from "@apollo/client";

export const GET_SCHEDULE_BY_LECTURER = gql`
  subscription GetSchedule($nidn: String!) {
    schedules(where: { nidn: { _eq: $nidn } }) {
      id
      course {
        course_id
        course_name
      }
      class {
        id
        class_name
        study_programs_id
        study_program {
          study_program_name
        }
      }
      lecturer {
        nidn
        fullname
      }
      day
      room
      time
      meet_number
    }
  }
`;
