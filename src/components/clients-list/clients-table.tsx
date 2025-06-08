'use client'

import {Button, HStack, Table} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {LuPencil, LuTrash} from "react-icons/lu";
import {useClients} from "@/lib/db/clients";
import {Client} from "@/lib/db";
import {useState} from "react";
import {ConfirmationDialog} from "@/components/ui/confirmation-dialog";

export interface ClientsTableProps {
  onEdit?: (client: Client) => void;
}

export const ClientsTable = (props: ClientsTableProps) => {
  const t = useTranslations("ClientsTable")
  const {allClients, deleteClientById} = useClients()
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)

  const onDeleteClient = async (id?: number) => {
    if (id) await deleteClientById(id)
    setClientToDelete(null)
  }

  return (
    <>
      <ConfirmationDialog
        open={clientToDelete != null}
        title={t('deleteClientTitle')}
        message={t('deleteClientMessage')}
        onCancel={() => setClientToDelete(null)}
        onConfirm={() => {
          onDeleteClient(clientToDelete?.id)
        }}
      />
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>{t('name')}</Table.ColumnHeader>
            <Table.ColumnHeader hideBelow="md">{t('email')}</Table.ColumnHeader>
            <Table.ColumnHeader hideBelow="md" width="40">{t('locale')}</Table.ColumnHeader>
            <Table.ColumnHeader hideBelow="md" width="40">{t('currency')}</Table.ColumnHeader>
            <Table.ColumnHeader width="40" textAlign="right">{t('actions')}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allClients.map((client) => (
            <Table.Row key={client.id}>
              <Table.Cell>{client.name}</Table.Cell>
              <Table.Cell hideBelow="md">{client.email}</Table.Cell>
              <Table.Cell hideBelow="md" width="40">{client.locale}</Table.Cell>
              <Table.Cell hideBelow="md" width="40">{client.currency}</Table.Cell>
              <Table.Cell width="40" textAlign="right">
                <HStack gap={2} justify="flex-end">
                  <Button
                    variant="plain"
                    size="sm"
                    onClick={() => props.onEdit?.(client)}
                  >
                    <LuPencil/>
                  </Button>
                  <Button
                    variant="plain"
                    colorPalette="red"
                    size="sm"
                    onClick={() => {
                      setClientToDelete(client)
                    }}
                  >
                    <LuTrash/>
                  </Button>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
