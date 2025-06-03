'use client'

import { Text, type TextProps } from '@chakra-ui/react'
import {useTranslation} from "@/lib/localization";

export const Copyright = (props: TextProps) => {
    const {t} = useTranslation();
  return (
    <Text fontSize="sm" color="fg.muted" {...props}>
        &copy; {new Date().getFullYear()}{' '}{t.copyright}<br></br>{t.createdBy}
    </Text>
  )
}
