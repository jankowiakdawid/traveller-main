import React from 'react'
import { screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter as Router } from 'react-router-dom'

import { render } from './test-utils'
import { App } from './App'

describe('<App /> component', () => {
  it('renders the Header content', () => {
    const history = createMemoryHistory()
    history.push('/')
    render(
      <Router history={history}>
        <App />
      </Router>
    )
    const HeadingComponent = screen.getByText(/^Smart traveller$/i)
    expect(HeadingComponent).toBeInTheDocument()
  })
})
