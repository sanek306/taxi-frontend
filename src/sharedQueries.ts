import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        profilePhoto
        firstName
        lastName
        email
        fullName
        isDriving
        places {
          name
          address
          lat
          lng
        }
      }
    }
  }
`;

export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;

export const GET_TRIPS = gql`
  query getTrips {
    GetRides {
      ok
      rides {
        id
        duration
        status
        price
        distance
        dropOffAddress
        pickUpAddress
      }
    }
  }
`;