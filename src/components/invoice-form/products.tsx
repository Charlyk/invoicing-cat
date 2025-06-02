'use client'

import {Box, For, SimpleGrid, Stack, Button} from "@chakra-ui/react";
import {Product} from "@/components/invoice-form/product";
import {LuPlus} from "react-icons/lu";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addItem, selectItems} from "@/lib/features/ivoicing/invoicingSlice";

export const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectItems);

    return (
        <Box background="gray.50" rounded="md" p="4" overflow="hidden">
            <SimpleGrid py="4" hideBelow="md" columns={{ base: 6, md: 14 }} gap="1">
                <For
                    each={[
                        { title: 'Items', gridColumn: 'span 7' },
                        { title: 'Qty', gridColumn: 'span 2' },
                        { title: 'Price', gridColumn: 'span 2' },
                        { title: 'Total', gridColumn: 'span 2', align: 'flex-end' },
                        { title: '', gridColumn: 'span 1', align: 'flex-start' },
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

            <Stack gap="4">
                {products.map((item) => (
                    <Product data={item} key={item.id} />
                ))}
            </Stack>

            <Box pt="4">
                <Button
                    colorPalette="blue"
                    variant="subtle"
                    onClick={() => dispatch(addItem())}
                >
                    <LuPlus/>
                    Add Item
                </Button>
            </Box>
        </Box>
    )
}
