import React from 'react'
import { screen } from '@testing-library/react'

import { render } from './test-utils'
import { Home } from './Home'
import { GET_CITIES } from './queries'

test('should show loading indicator', () => {
  render(<Home />)

  screen.getByRole('progressbar')
})

test('should show error alert on error', async () => {
  const errorMock = {
    request: {
      query: GET_CITIES,
    },
    error: new Error('An error occurred'),
  }
  render(<Home />, { mocks: [errorMock] })

  await screen.findByRole('alert')
  screen.queryByText('Woops! Something went horribly worng!')
})

test('should show list of cities', async () => {
  const mock = {
    request: {
      query: GET_CITIES,
    },
    result: {
      data: {
        cities: {
          cities: [
            { id: 1, name: 'Poznan', country: 'Poland' },
            { id: 2, name: 'London', country: 'Great Britain' },
          ],
        },
      },
    },
  }
  render(<Home />, { mocks: [mock] })

  await screen.findByText('Poznan')
  await screen.findByText('London')
})
