'use client'

import {Container, HStack, Icon, Image, Link, Stack} from '@chakra-ui/react'
import {SiGithub, SiInstagram, SiLinkedin, SiReddit, SiX} from 'react-icons/si'
import {Copyright} from './copyright'
import {Logo} from "@/components/nav-bar/logo";
import supportedLocales from "@/data/locales";
import {usePathname} from "@/i18n/navigation";
import {useColorMode} from "@/components/ui/color-mode";

export const Footer = () => {
    const pathname = usePathname()
    const {colorMode} = useColorMode()

    const localizedPath = (href: string) => {
        return `${href}${pathname}`
    }

    return (
      <Container as="footer" py={{base: '10', md: '12'}}>
          <Stack gap="6" align="center">
              <Stack width="full" direction="row" justify="space-between" align="center">
                  <Logo/>
                  <HStack gap="4">
                      {socialLinks.map(({href, icon}, index) => (
                          <Link key={index} href={href} colorPalette="gray">
                              <Icon size="md">{icon}</Icon>
                          </Link>
                      ))}
                  </HStack>
              </Stack>
              <HStack gap="4" justify="center" flexWrap="wrap">
                  {navLinks.map(({href, label}, index) => (
                      <Link key={index} href={localizedPath(href)} colorPalette="gray">
                          {label}
                      </Link>
                  ))}
              </HStack>
              {colorMode === 'light' ? (
                  <a href="https://www.producthunt.com/products/invoicingcat?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-invoicingcat"
                     target="_blank"><Image
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=976065&theme=light&t=1749626896166"
                      alt="InvoicingCat - A&#0032;100&#0037;&#0032;free&#0032;invoice&#0032;generator&#0032;for&#0032;freelancers | Product Hunt"
                      style={{width: '250px', height: '54px'}} width="250" height="54"/></a>
              ) : (
                  <a href="https://www.producthunt.com/products/invoicingcat?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-invoicingcat"
                     target="_blank"><Image
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=976065&theme=dark&t=1749627092078"
                      alt="InvoicingCat - A&#0032;100&#0037;&#0032;free&#0032;invoice&#0032;generator&#0032;for&#0032;freelancers | Product Hunt"
                      style={{width: '250px', height: '54px'}} width="250" height="54"/></a>
              )}
              <Copyright/>
          </Stack>
      </Container>
    )
}

const socialLinks = [
    {href: 'https://x.com/eduardalbu', icon: <SiX/>},
    {href: 'https://github.com/Charlyk', icon: <SiGithub/>},
    {href: 'https://www.linkedin.com/in/eduard-albu-4a156698/', icon: <SiLinkedin/>},
    {href: 'https://www.instagram.com/eduard.albu.dev', icon: <SiInstagram/>},
    {href: 'https://www.reddit.com/user/eduardalbu/', icon: <SiReddit/>},
]

const navLinks = supportedLocales;
