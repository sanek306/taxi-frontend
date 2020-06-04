import { gql } from "apollo-boost";

export const PHONE_SIGN_IN = gql`
  mutation startPhoneVerification($phoneNumber: String!, $recaptchaToken: String!) {
      StartPhoneVerification(phoneNumber: $phoneNumber, recaptchaToken: $recaptchaToken) {
          ok
          error
      }
  } 
`;