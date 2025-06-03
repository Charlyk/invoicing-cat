import { Text, type TextProps } from '@chakra-ui/react'

export const Copyright = (props: TextProps) => {
  return (
    <Text fontSize="sm" color="fg.muted" {...props}>
        &copy; {new Date().getFullYear()} InvoicingCat, All rights reserved.<br></br>❤️ Created with love by Eduard Albu.
    </Text>
  )
}
