'use client'

import { Text, type TextProps } from '@chakra-ui/react'
import {useTranslations} from "next-intl";

export const Copyright = (props: TextProps) => {
    const t = useTranslations('Footer')
  return (
    <Text fontSize="sm" color="fg.muted" {...props}>
        &copy; {new Date().getFullYear()}{' '}{t('copyright')}<br></br>{t('createdBy')}
    </Text>
  )
}
