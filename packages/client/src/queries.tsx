import { gql } from '@apollo/client'

export const GET_CITIES = gql`
  query Cities {
    cities(filter: { name: "" }, limit: 10) {
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
