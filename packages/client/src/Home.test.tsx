import React from 'react'
import { screen } from '@testing-library/react'

import { render } from './test-utils'
import { Home } from './Home'

test('should show loading indicator', () => {
  render(<Home />)

  screen.getByRole('progressbar')
})
