import { Box, Text, HStack, Icon } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

import type { City } from './queries'

type Props = {
  city: City
}

export function CityBlock({ city }: Props): JSX.Element {
  const visitedColor = 'gray.200'

  return (
    <HStack
      as="article"
      w="100%"
      spacing={4}
      borderColor={visitedColor}
      borderStyle="solid"
      borderWidth={1}
      borderRadius={8}
      paddingX={4}
      paddingY={2}
    >
      <Icon as={CheckCircleIcon} w={6} h={6} color={visitedColor} />
      <Box textAlign="left">
        <Text fontSize="3xl">{city.name}</Text>
        <Text color="gray.500" fontSize="xl">
          {city.country}
        </Text>
      </Box>
    </HStack>
  )
}
