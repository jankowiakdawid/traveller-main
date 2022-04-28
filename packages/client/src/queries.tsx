import { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import type { QueryResult } from '@apollo/client'

export const LIMIT = 10

export const GET_CITIES = gql`
  query Cities($city_name: String, $wishlist: Boolean, $visited: Boolean, $offset: Int) {
    cities(filter: { name: $city_name, wishlist: $wishlist, visited: $visited }, limit: ${LIMIT}, offset: $offset) {
      cities {
        id
        name
        country
        visited
        wishlist
      }
      total
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

export function useRefreshedQuery(variables: {
  wishlist?: boolean
  visited?: boolean
  city_name?: string
}): QueryResult {
  const queryResponse = useQuery(GET_CITIES, { variables })

  useEffect(() => {
    queryResponse.refetch()
  }, [])

  return queryResponse
}
