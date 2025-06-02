import { Box } from '@chakra-ui/react'

export const InvoicePage = ({ children }: { children: React.ReactNode }) => (
  <Box
    bg="bg.panel"
    width="100%"
    maxW="794px"       // A4 width at 96dpi
    aspectRatio="1 / 1.414" // A4 ratio (210mm × 297mm)
    boxShadow="lg"
    p={8}
    m="auto"
    mb={6}
    overflow="hidden"
    className="invoice-page"
  >
    {children}
  </Box>
)
