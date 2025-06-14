import {ProductData} from "@/components/invoice-form/types";
import {Box, Flex, For, SimpleGrid, Stack, Text, VStack} from "@chakra-ui/react";
import {useAppSelector} from "@/lib/hooks";
import {selectClient} from "@/lib/features/ivoicing/invoicingSlice";
import {useClientTranslation} from "@/i18n/useClientTranslation";
import formatCurrencyWithClient from "@/lib/formatCurrencyWithClient";

export const InvoiceProducts = ({items, locale}: { items: ProductData[], locale: string }) => {
  const t = useClientTranslation(locale)

  return (
    <Box overflow="hidden" width="full">
      <SimpleGrid
        px="4"
        background="bg.muted"
        py="2"
        width="full"
        columns={14}
        gap="2"
      >
        <For
          each={[
            {id: 'items', title: t('items'), gridColumn: 'span 8'},
            {id: 'quantity', title: t('quantity'), gridColumn: 'span 2'},
            {id: 'price', title: t('price'), gridColumn: 'span 2'},
            {id: 'total', title: t('total'), gridColumn: 'span 2', align: 'flex-end'},
          ]}
        >
          {(item) => (
            <Stack
              key={item.id}
              color="fg.muted"
              textStyle="sm"
              gridColumn={item.gridColumn}
              align={item.align}
            >
              {item.title}
            </Stack>
          )}
        </For>
      </SimpleGrid>
      <Stack>
        {items.map((item) => (
          <InvoiceProduct key={item.id} data={item}/>
        ))}
      </Stack>
    </Box>
  )
}

const InvoiceProduct = ({data}: { data: ProductData }) => {
  const client = useAppSelector(selectClient)
  return (
    <SimpleGrid px="4" py="2" columns={14} gap="2">
      <Flex gridColumn="span 8" gap="4" alignContent="center">
        <Text fontSize="sm">{data.title}</Text>
      </Flex>

      <Box gridColumn="span 2" alignContent="center">
        <Text fontSize="sm">{data.quantity}</Text>
      </Box>

      <Box gridColumn="span 2" alignContent="center">
        <Text fontSize="sm">
          {formatCurrencyWithClient(data.price, client)}
        </Text>
      </Box>

      <VStack align="flex-end" gridColumn="span 2" gap="8">
        <Box flex="1" alignContent="center">
          <Text fontWeight="semibold" fontSize="sm">
            {formatCurrencyWithClient(data.price * data.quantity, client)}
          </Text>
        </Box>
      </VStack>
    </SimpleGrid>
  )
}
