import React from 'react'
import type { FC } from 'react'
import {
  Container,
  InputRightElement,
  Input,
  Heading,
  InputGroup,
  IconButton,
  VStack,
  Icon,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'
import { Search2Icon, SpinnerIcon } from '@chakra-ui/icons'

import { ErrorAlert } from './ErrorAlert'
import { useRefreshedQuery, LIMIT } from './queries'
import type { City } from './queries'

import { CityBlock } from './CityBlock'

function pagesList(total: number) {
  const length = total / LIMIT

  return Array.from({ length }, (_, i) => i)
}

export const Home: FC = () => {
  const [variables, setVariables] = React.useState<{ city_name: string; offset?: number }>({ city_name: '' })
  const { loading, error, data } = useRefreshedQuery(variables)

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const variables = Object.fromEntries(new FormData(event.currentTarget)) as { city_name: string }

    setVariables(variables)
  }

  function goToPage(page: number) {
    const offset = page * LIMIT

    setVariables(vars => ({ ...vars, offset }))
  }

  return (
    <VStack spacing="8" marginBottom={8}>
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
          <>
            <VStack spacing={4}>
              {data.cities.cities.map((city: City) => (
                <CityBlock key={city.id} city={city} />
              ))}
            </VStack>
            <ButtonGroup
              size="sm"
              isAttached
              variant="outline"
              marginTop={6}
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
            >
              {pagesList(data.cities.total).map(pageNumber => (
                <Button
                  backgroundColor={pageNumber === (variables?.offset ?? 0) / LIMIT ? 'gray.200' : ''}
                  onClick={() => goToPage(pageNumber)}
                >
                  {pageNumber + 1}
                </Button>
              ))}
            </ButtonGroup>
          </>
        )}
      </Container>
    </VStack>
  )
}
