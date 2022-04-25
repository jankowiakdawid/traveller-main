import React from 'react'
import { screen } from '@testing-library/react'

import { render } from './test-utils'
import { Home, GET_CITIES } from './Home'

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
