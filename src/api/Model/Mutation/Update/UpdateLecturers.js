import { gql } from "@apollo/client";

export const UPDATE_LECTURER = gql`
  mutation UpdateLecturer($nidn: String!, $fullname: String!, $address: String!, $phone_number: String!, $email: String!) {
    update_lecturers(_set: { fullname: $fullname, address: $address, phone_number: $phone_number, email: $email }, where: { nidn: { _eq: $nidn } }) {
      returning {
        nidn
      }
    }
  }
`;
