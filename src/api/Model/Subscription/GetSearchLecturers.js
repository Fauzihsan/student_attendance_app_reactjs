import { gql } from "@apollo/client";

export const GET_LECTURERS_SEARCH = gql`
  subscription GetLecturers($nidn: String!) {
    lecturers(where: { nidn: { _eq: $nidn } }, order_by: { created_at: desc }) {
      nidn
      fullname
      address
      phone_number
      email
    }
  }
`;
