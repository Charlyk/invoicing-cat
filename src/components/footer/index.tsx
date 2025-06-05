import { Container, HStack, Icon, Link, Stack } from '@chakra-ui/react'
import {SiGithub, SiInstagram, SiLinkedin, SiReddit, SiX} from 'react-icons/si'
import { Copyright } from './copyright'
import {Logo} from "@/components/nav-bar/logo";

export const Footer = () => (
  <Container as="footer" py={{ base: '10', md: '12' }}>
    <Stack gap="6">
      <Stack direction="row" justify="space-between" align="center">
        <Logo />
        <HStack gap="4">
          {navLinks.map(({ href, label }, index) => (
              <Link key={index} href={href} colorPalette="gray">
                {label}
              </Link>
          ))}
        </HStack>
        <HStack gap="4">
          {socialLinks.map(({ href, icon }, index) => (
            <Link key={index} href={href} colorPalette="gray">
              <Icon size="md">{icon}</Icon>
            </Link>
          ))}
        </HStack>
      </Stack>
      <Copyright />
    </Stack>
  </Container>
)

const socialLinks = [
  { href: 'https://x.com/eduardalbu', icon: <SiX /> },
  { href: 'https://github.com/Charlyk', icon: <SiGithub /> },
  { href: 'https://www.linkedin.com/in/eduard-albu-4a156698/', icon: <SiLinkedin /> },
  { href: 'https://www.instagram.com/eduard.albu.dev', icon: <SiInstagram /> },
  { href: 'https://www.reddit.com/user/eduardalbu/', icon: <SiReddit /> },
]

const navLinks = [
  { href: '/en', label: 'English' },
  { href: '/fr', label: 'Français' },
  { href: '/de', label: 'Deutsch' },
  { href: '/pt', label: 'Português' },
];
