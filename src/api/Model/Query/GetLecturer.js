import { gql } from "@apollo/client";

export const GET_LECTURERS = gql`
  query GetLecturers {
    lecturers(order_by: { created_at: desc }) {
      nidn
      fullname
      address
      phone_number
      email
    }
  }
`;
