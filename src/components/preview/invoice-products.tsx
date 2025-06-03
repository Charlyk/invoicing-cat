import {ProductData} from "@/components/invoice-form/types";
import {Box, Flex, For, FormatNumber, SimpleGrid, Stack, Text, VStack} from "@chakra-ui/react";
import {useAppSelector} from "@/lib/hooks";
import {selectCurrency} from "@/lib/features/ivoicing/invoicingSlice";

export const InvoiceProducts = ({items}: { items: ProductData[] }) => {
    return (
        <Box overflow="hidden" width="full">
            <SimpleGrid
                px="4"
                background="bg.muted"
                py="2"
                width="full"
                columns={{base: 6, md: 14}}
                gap="2"
            >
                <For
                    each={[
                        {title: 'Item', gridColumn: 'span 8'},
                        {title: 'Qty', gridColumn: 'span 2'},
                        {title: 'Price', gridColumn: 'span 2'},
                        {title: 'Total', gridColumn: 'span 2', align: 'flex-end'},
                    ]}
                >
                    {(item) => (
                        <Stack
                            key={item.title}
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
    const currency = useAppSelector(selectCurrency)
    return (
        <SimpleGrid px="4" py="2" columns={{base: 6, md: 14}} gap="2">
            <Flex gridColumn="span 8" gap="4" alignContent="center">
                <Text fontSize="sm">{data.title}</Text>
            </Flex>

            <Box gridColumn="span 2" alignContent="center">
                <Text fontSize="sm">{data.quantity}</Text>
            </Box>

            <Box gridColumn="span 2" alignContent="center">
                <Text fontSize="sm">
                    <FormatNumber
                        value={data.price}
                        style="currency"
                        currency={currency.code}
                    />
                </Text>
            </Box>

            <VStack align="flex-end" gridColumn="span 2" gap="8">
                <Box flex="1" alignContent="center">
                    <Text fontWeight="semibold" fontSize="sm">
                        <FormatNumber
                            value={data.price * data.quantity}
                            style="currency"
                            currency={currency.code}
                        />
                    </Text>
                </Box>
            </VStack>
        </SimpleGrid>
    )
}
