import { gql } from '@apollo/client'

export const GET_CITIES = gql`
  query Cities($city_name: String!) {
    cities(filter: { name: $city_name }, limit: 10) {
      cities {
        id
        name
        country
      }
    }
  }
`

export type City = {
  id: number
  name: string
  country: string
}
