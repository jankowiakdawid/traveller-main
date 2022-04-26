import { Box, Text, HStack, Icon } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useMutation } from '@apollo/client'

import { VISIT_CITY } from './queries'
import type { City } from './queries'

type BtnProps = {
  children: React.ReactNode
  checked: boolean
  onClick: () => void
}

function CheckedButton({ children, checked, onClick }: BtnProps) {
  return (
    <button onClick={onClick}>
      <input type="checkbox" checked={checked} readOnly style={{ height: 0, width: 0, opacity: 0 }} />
      {children}
    </button>
  )
}

type Props = {
  city: City
}

export function CityBlock({ city }: Props): JSX.Element {
  const visitedColor = city.visited ? 'green.400' : 'gray.200'

  const [visitCity] = useMutation(VISIT_CITY)

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
      <CheckedButton
        checked={city.visited}
        onClick={() => visitCity({ variables: { id: city.id, visited: !city.visited } })}
      >
        <Icon as={CheckCircleIcon} w={6} h={6} color={visitedColor} />
      </CheckedButton>
      <Box textAlign="left">
        <Text fontSize="3xl">{city.name}</Text>
        <Text color="gray.500" fontSize="xl">
          {city.country}
        </Text>
      </Box>
    </HStack>
  )
}
