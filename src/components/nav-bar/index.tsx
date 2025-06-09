'use client'

import {
  Button,
  Center, CollapsibleContent,
  CollapsibleRoot,
  Container,
  HStack, Link,
  Spacer,
} from '@chakra-ui/react'
import {Logo} from './logo'
import {ColorModeButton} from "@/components/ui/color-mode";
import {LuDownload} from "react-icons/lu";
import {useTranslations} from "next-intl";
import {NavbarLinks} from "@/components/nav-bar/navbar-links";
import {CollapsibleTrigger} from "@/components/nav-bar/collapsible-trigger";
import {useDownloadAndStoreInvoice} from "@/lib/use-invoice-download";

export interface NavBarProps {
  downloadable?: boolean;
}

export const NavBar = (props: NavBarProps) => {
  const t = useTranslations('NavBar')
  const {downloadAndStore, isLoading} = useDownloadAndStoreInvoice()

  const handleDownloadClick = async () => {
    await downloadAndStore()
  }

  return (
    <Center position="sticky" zIndex="docked" top="6" left="4" right="4">
      <Container
        background="bg.panel"
        borderRadius="l3"
        boxShadow="xs"
        maxW={{base: 'full', md: 'fit-content'}}
        px="4"
        mx={{base: '4', md: 'auto'}}
        py="3"
      >
        <CollapsibleRoot>
          <HStack gap={{base: '3', md: '8'}}>
            <Link href="/">
              <Logo/>
            </Link>
            <Spacer hideFrom="md"/>
            <NavbarLinks hideBelow="md"/>
            <ColorModeButton/>
            {props.downloadable && (
              <Button
                size={{base: 'sm', md: 'md'}}
                loading={isLoading}
                onClick={handleDownloadClick}
              >
                <LuDownload/>
                {t('downloadInvoice')}
              </Button>
            )}
            <CollapsibleTrigger/>
          </HStack>
          <CollapsibleContent hideFrom="md">
            <NavbarLinks pt="5" pb="2" alignItems="center"/>
          </CollapsibleContent>
        </CollapsibleRoot>
      </Container>
    </Center>
  )
}
