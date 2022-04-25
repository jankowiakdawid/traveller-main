import { Box, Text } from '@chakra-ui/react'

import type { City } from './queries'

type Props = {
  city: City
}

export function CityBlock({ city }: Props): JSX.Element {
  return (
    <Box as="article" textAlign="left" w="100%">
      <Text fontSize="3xl">{city.name}</Text>
      <Text color="gray.600">{city.country}</Text>
    </Box>
  )
}
