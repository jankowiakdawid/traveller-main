import React from 'react'
import type { FC } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack, Icon } from '@chakra-ui/react'
import { Search2Icon, SpinnerIcon } from '@chakra-ui/icons'
import { useQuery } from '@apollo/client'

import { ErrorAlert } from './ErrorAlert'
import { GET_CITIES } from './queries'
import type { City } from './queries'

import { CityBlock } from './CityBlock'

export const Home: FC = () => {
  const [variables, setVariables] = React.useState({ city_name: '' })
  const { loading, error, data } = useQuery(GET_CITIES, { variables })

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const variables = Object.fromEntries(new FormData(event.currentTarget)) as { city_name: string }

    setVariables(variables)
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <form onSubmit={search}>
          <InputGroup>
            <Input name="city_name" placeholder="Search for a city" />
            <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} />} />
          </InputGroup>
        </form>
      </Container>
      <Container maxW="container.md">
        {loading && <Icon as={SpinnerIcon} w={8} h={8} color="blue.500" role="progressbar" aria-busy={true} />}
        {error && <ErrorAlert message={error.message} />}
        {data && (
          <VStack spacing={4}>
            {data.cities.cities.map((city: City) => (
              <CityBlock key={city.id} city={city} />
            ))}
          </VStack>
        )}
      </Container>
    </VStack>
  )
}
