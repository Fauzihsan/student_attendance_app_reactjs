import { gql } from "@apollo/client";

export const UPDATE_ATTENDANCE_P1 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_1: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P2 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_2: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P3 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_3: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P4 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_4: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P5 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_5: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P6 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_6: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P7 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_7: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P8 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_8: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P9 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_9: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P10 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_10: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P11 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_11: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P12 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_12: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P13 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_13: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
export const UPDATE_ATTENDANCE_P14 = gql`
  mutation UpdateAttendance($status: Int!, $npm: String!, $schedules_id: Int!) {
    update_attendances(_set: { p_14: $status }, where: { npm: { _eq: $npm }, _and: { schedules_id: { _eq: $schedules_id } } }) {
      returning {
        npm
      }
    }
  }
`;
