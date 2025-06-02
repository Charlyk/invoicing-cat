import {
  Center,
  CollapsibleContent,
  CollapsibleRoot,
  Container,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import { Logo } from './logo'
import { CollapsibleTrigger } from './collapsible-trigger'
import { NavbarLinks } from './navbar-links'
import {ColorModeButton} from "@/components/ui/color-mode";

export const NavBar = () => {
  return (
    <Center position="sticky" zIndex="docked" top="6" left="4" right="4">
      <Container
        background="bg.panel"
        borderRadius="l3"
        boxShadow="xs"
        maxW={{ base: 'full', md: 'fit-content' }}
        px="4"
        py="3"
      >
        <CollapsibleRoot>
          <HStack gap={{ base: '3', md: '8' }}>
            <Logo />
            <Spacer hideFrom="md" />
            <NavbarLinks hideBelow="md" />
            <ColorModeButton/>
            <CollapsibleTrigger />
          </HStack>
          <CollapsibleContent hideFrom="md">
            <NavbarLinks pt="5" pb="2" alignItems="center" />
          </CollapsibleContent>
        </CollapsibleRoot>
      </Container>
    </Center>
  )
}
