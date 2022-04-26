import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

const emptySearchMock = {
  request: {
    query: GET_CITIES,
    variables: { city_name: '' },
  },
  result: {
    data: {
      cities: {
        cities: [
          { id: 1, name: 'Poznan', country: 'Poland', visited: false, wishlist: false },
          { id: 2, name: 'London', country: 'Great Britain', visited: false, wishlist: false },
        ],
      },
    },
  },
}

test('should show list of cities', async () => {
  render(<Home />, { mocks: [emptySearchMock] })

  await screen.findByText('Poznan')
  await screen.findByText('London')
})

const warSearchMock = {
  request: {
    query: GET_CITIES,
    variables: { city_name: 'war' },
  },
  result: {
    data: {
      cities: {
        cities: [{ id: 1, name: 'Warszawa', country: 'Poland', visited: false, wishlist: false }],
      },
    },
  },
}

test('should search for new cities', async () => {
  render(<Home />, { mocks: [emptySearchMock, warSearchMock] })

  await screen.findByText('Poznan')
  await screen.findByText('London')

  userEvent.type(screen.getByRole('textbox'), 'war{enter}')

  await screen.findByText('Warszawa')
})

test('should show error after search', async () => {
  const errorMock = {
    request: {
      query: GET_CITIES,
      variables: { city_name: 'war' },
    },
    error: new Error('An error occurred'),
  }
  render(<Home />, { mocks: [emptySearchMock, errorMock] })

  await screen.findByText('Poznan')
  await screen.findByText('London')

  userEvent.type(screen.getByRole('textbox'), 'war{enter}')

  screen.getByRole('progressbar')

  await screen.findByRole('alert')
  screen.queryByText('Woops! Something went horribly worng!')
})
