'use client'

import {Button, Heading, HStack, Stack} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {LuPlus} from "react-icons/lu";
import {ClientsTable} from "@/components/clients-list/clients-table";
import {ClientFormDialog} from "@/components/clients-list/client-form-dialog";
import {useState} from "react";
import {useClients} from "@/lib/db/clients";
import {Client} from "@/lib/db";

export const ClientsList = () => {
  const t = useTranslations('ClientsList')
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const {createClient} = useClients()

  const onSaveClient = async (client: Client) => {
    setIsLoading(true);
    await createClient(client)
    setShowModal(false);
    setIsLoading(false);
    setClientToEdit(null)
  }

  return (
    <Stack gap={2} width="full">
      <HStack gap="4" justify="space-between" width="full" align="center">
        <Heading as="h1" fontSize="xl" fontWeight="bold">
          {t('title')}
        </Heading>
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
        isLoading={isLoading}
        client={clientToEdit}
        onClose={() => {
          setShowModal(false)
          setClientToEdit(null)
        }}
        onSave={onSaveClient}
      />
    </Stack>
  )
}
