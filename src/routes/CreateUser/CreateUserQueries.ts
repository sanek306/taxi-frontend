import { gql } from "apollo-boost";

export const CREATE_USER = gql`  
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
  ) {
    CreateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
    ) {
      ok
      token
      error
    }
  }
`;
