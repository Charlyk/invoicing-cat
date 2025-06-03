import {Box, HStack, Image, ImageProps} from "@chakra-ui/react";

export const Logo = (props: ImageProps) => (
  <HStack>
      <Image src="/logo.png" alt="InvoicingCat" height="45px" {...props} />
      <Box hideBelow="md">
          <Text height={30}/>
      </Box>
  </HStack>
)

export const Text = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 90 34" xmlns="http://www.w3.org/2000/svg" {...props} height={45}>
      <title>AgreeKit Logo</title>
      <text
        x="0"
        y="24"
        fill="var(--chakra-colors-fg)"
      >
          InvoicingCat
      </text>
  </svg>
)
