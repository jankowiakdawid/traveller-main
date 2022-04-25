import { Alert, AlertIcon, AlertTitle, AlertDescription, Box } from '@chakra-ui/react'

type Props = {
  message: string
}

export function ErrorAlert({ message }: Props): JSX.Element {
  return (
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      <Box textAlign="left" paddingY={4}>
        <AlertTitle>Woops! Something went horribly worng!</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Box>
    </Alert>
  )
}
