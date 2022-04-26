import { gql } from '@apollo/client'

export const GET_CITIES = gql`
  query Cities($city_name: String!) {
    cities(filter: { name: $city_name }, limit: 10) {
      cities {
        id
        name
        country
        visited
        wishlist
      }
    }
  }
`

export const VISIT_CITY = gql`
  mutation VisitCity($id: Int!, $visited: Boolean!) {
    updateCity(input: { id: $id, visited: $visited }) {
      id
      visited
    }
  }
`

export const WISHLIST_CITY = gql`
  mutation WishlistCity($id: Int!, $wishlist: Boolean!) {
    updateCity(input: { id: $id, wishlist: $wishlist }) {
      id
      wishlist
    }
  }
`

export type City = {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}
