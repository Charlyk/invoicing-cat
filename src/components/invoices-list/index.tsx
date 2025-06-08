'use client'

import {Heading, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {LuShieldCheck} from "react-icons/lu";
import {InvoicesTable} from "@/components/invoices-list/invoices-table";

export const InvoicesList = () => {
  const t = useTranslations('InvoicesList')

  return (
    <Stack gap={8} width="full">
      <HStack gap="4" justify="space-between" width="full" align="center">
        <VStack alignItems="flex-start">
          <Heading as="h1" fontSize="xl" fontWeight="bold">
            {t('title')}
          </Heading>
          <HStack hideBelow="md">
            <LuShieldCheck/>
            <Text fontSize="sm">
              {t('privacyMessage')}
            </Text>
          </HStack>
          <Text fontSize="sm" hideFrom="md">
            {t('privacyMessage')}
          </Text>
        </VStack>
      </HStack>
      <InvoicesTable/>
    </Stack>
  )
}
