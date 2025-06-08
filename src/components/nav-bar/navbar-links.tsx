import { Link, Stack, type StackProps } from '@chakra-ui/react'
import {useTranslations} from "next-intl";

export const NavbarLinks = (props: StackProps) => {
  const t = useTranslations('NavBar')

  const navbarLinks = [
    {
      name: t('clients'),
      href: '/clients',
    },
  ]

  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
      {navbarLinks.map((item) => (
        <Link
          key={item.href}
          fontWeight="medium"
          color="fg.muted"
          href={item.href}
          _hover={{
            _hover: { color: 'colorPalette.fg', textDecoration: 'none' },
          }}
        >
          {item.name}
        </Link>
      ))}
    </Stack>
  )
}
