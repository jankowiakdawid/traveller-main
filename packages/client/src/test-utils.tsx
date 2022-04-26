import * as React from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { MockedProvider } from '@apollo/client/testing'
import type { MockedResponse } from '@apollo/client/testing'

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions & { mocks?: MockedResponse<Record<string, any>>[] }
): void => {
  const AllProviders = ({ children }: { children?: React.ReactNode }) => (
    <MockedProvider addTypename={false} mocks={options?.mocks ?? ([] as MockedResponse<Record<string, any>>[])}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </MockedProvider>
  )

  render(ui, { wrapper: AllProviders, ...options })
}
export { customRender as render }
