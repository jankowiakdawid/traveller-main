import {} from '@chakra-ui/react'

import type { City } from './queries'

type Props = {
  city: City
}

export function CityBlock({ city }: Props): JSX.Element {
  return (
    <article>
      <p>{city.name}</p>
      <p>{city.country}</p>
    </article>
  )
}
