'use client'

import {Button, Heading, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {LuPlus, LuShieldCheck} from "react-icons/lu";
import {ClientsTable} from "@/components/clients-list/clients-table";
import {ClientFormDialog} from "@/components/clients-list/client-form-dialog";
import {useState} from "react";
import {Client} from "@/lib/db";

export const ClientsList = () => {
  const t = useTranslations('ClientsList')
  const [showModal, setShowModal] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

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
        <Button onClick={() => setShowModal(true)}>
          <LuPlus/>
          {t('addClient')}
        </Button>
      </HStack>
      <ClientsTable
        onEdit={(client) => {
          setClientToEdit(client)
          setShowModal(true)
        }}
      />
      <ClientFormDialog
        open={showModal}
        client={clientToEdit}
        onClose={() => {
          setShowModal(false)
          setClientToEdit(null)
        }}
        onSaved={() => {
          setShowModal(false)
          setClientToEdit(null)
        }}
      />
    </Stack>
  )
}
