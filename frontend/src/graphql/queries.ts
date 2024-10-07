import { gql } from "@apollo/client"

export const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      id
      name
      emoji
      code
      continent {
        id
        name
      }
    }
  }
`

export const GET_ALL_CONTINENTS = gql`
  query GetAllContinents {
    continents {
      id
      name
    }
  }
`
