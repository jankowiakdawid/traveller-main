import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from './test-utils'
import { CityBlock } from './CityBlock'

import type { City } from './queries'
import { VISIT_CITY } from './queries'

const city: City = {
  id: 1,
  name: 'Poznan',
  country: 'Poland',
  visited: true,
}

test('should show basic info', () => {
  render(<CityBlock city={city} />)

  screen.getByText('Poznan')
  screen.getByText('Poland')
})

test('should show visited state', () => {
  render(<CityBlock city={city} />)

  screen.getByRole('checkbox', { checked: true })
})

test('should run mutation on click', async () => {
  const result = jest.fn(() => ({ data: { updateCity: { id: 1, visited: false } } }))
  render(<CityBlock city={city} />, {
    mocks: [
      {
        request: { query: VISIT_CITY, variables: { id: 1, visited: false } },
        result,
      },
    ],
  })

  userEvent.click(screen.getByRole('button'))

  waitFor(() => expect(result).toHaveBeenCalled())
})
