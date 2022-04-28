import React from 'react'
import type { FC } from 'react'
import { Container, Heading, VStack, Icon } from '@chakra-ui/react'
import { SpinnerIcon } from '@chakra-ui/icons'
import { useQuery } from '@apollo/client'
import type { QueryResult } from '@apollo/client'

import { ErrorAlert } from './ErrorAlert'
import { GET_CITIES } from './queries'
import type { City } from './queries'

import { CityBlock } from './CityBlock'

function useRefreshedQuery(variables: { wishlist: boolean }): QueryResult {
  const queryResponse = useQuery(GET_CITIES, { variables })

  React.useEffect(() => {
    queryResponse.refetch()
  }, [])

  return queryResponse
}

export const WishList: FC = () => {
  const { loading, error, data, refetch } = useRefreshedQuery({ wishlist: true })

  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        {loading && <Icon as={SpinnerIcon} w={8} h={8} color="blue.500" role="progressbar" aria-busy={true} />}
        {error && <ErrorAlert message={error.message} />}
        {data && (
          <VStack spacing={4} w="100%">
            {data.cities.cities.map((city: City) => (
              <CityBlock key={city.id} city={city} onWishlistClick={refetch} />
            ))}
          </VStack>
        )}
      </Container>
    </>
  )
}
