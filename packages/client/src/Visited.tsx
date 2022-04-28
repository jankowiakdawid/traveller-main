import React from 'react'
import type { FC } from 'react'
import { Container, Heading, VStack, Icon } from '@chakra-ui/react'
import { SpinnerIcon } from '@chakra-ui/icons'

import { ErrorAlert } from './ErrorAlert'
import { useRefreshedQuery } from './queries'
import type { City } from './queries'

import { CityBlock } from './CityBlock'

export const Visited: FC = () => {
  const { loading, error, data, refetch } = useRefreshedQuery({ visited: true })

  return (
    <>
      <Heading as="h1">Visited</Heading>
      <Container centerContent maxW="container.md" flexDir="row" paddingTop={8}>
        {loading && <Icon as={SpinnerIcon} w={8} h={8} color="blue.500" role="progressbar" aria-busy={true} />}
        {error && <ErrorAlert message={error.message} />}
        {data && (
          <VStack spacing={4} w="100%">
            {data.cities.cities.map((city: City) => (
              <CityBlock key={city.id} city={city} onVisitedClick={refetch} />
            ))}
          </VStack>
        )}
      </Container>
    </>
  )
}
