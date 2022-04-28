import { Box, Text, HStack, Icon, VisuallyHidden } from '@chakra-ui/react'
import { CheckCircleIcon, StarIcon } from '@chakra-ui/icons'
import { useMutation } from '@apollo/client'

import { VISIT_CITY, WISHLIST_CITY } from './queries'
import type { City } from './queries'

type BtnProps = {
  name: string
  children: React.ReactNode
  checked: boolean
  onClick: () => void
}

function CheckedButton({ children, checked, onClick, name }: BtnProps) {
  return (
    <button onClick={onClick}>
      <VisuallyHidden>{name}</VisuallyHidden>
      <input type="checkbox" checked={checked} readOnly style={{ height: 0, width: 0, opacity: 0 }} />
      {children}
    </button>
  )
}

type Props = {
  city: City
  onVisitedClick?: () => void
}

export function CityBlock({ city, onVisitedClick }: Props): JSX.Element {
  const visitedColor = city.visited ? 'green.400' : 'gray.200'
  const wishlistColor = city.wishlist ? 'yellow.400' : 'gray.200'

  const [visitCity] = useMutation(VISIT_CITY)
  const [wishlistCity] = useMutation(WISHLIST_CITY)

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
        name="visited"
        checked={city.visited}
        onClick={() => (visitCity({ variables: { id: city.id, visited: !city.visited } }), onVisitedClick?.())}
      >
        <Icon as={CheckCircleIcon} w={6} h={6} color={visitedColor} />
      </CheckedButton>
      <CheckedButton
        name="wishlist"
        checked={city.wishlist}
        onClick={() => wishlistCity({ variables: { id: city.id, wishlist: !city.wishlist } })}
      >
        <Icon as={StarIcon} w={6} h={6} color={wishlistColor} />
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
