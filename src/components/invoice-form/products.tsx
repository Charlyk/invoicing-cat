'use client'

import {Box, For, SimpleGrid, Stack, Button} from "@chakra-ui/react";
import {Product} from "@/components/invoice-form/product";
import {LuPlus} from "react-icons/lu";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addItem, selectItems} from "@/lib/features/ivoicing/invoicingSlice";
import {useTranslation} from "@/lib/localization";

export const Products = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectItems);

    return (
        <Box background="bg.panel" border="xs" rounded="md" p="4" overflow="hidden">
            <SimpleGrid py="4" hideBelow="md" columns={{ base: 6, md: 14 }} gap="1">
                <For
                    each={[
                        { title: t.products.items, gridColumn: 'span 7' },
                        { title: t.products.quantity, gridColumn: 'span 2' },
                        { title: t.products.price, gridColumn: 'span 2' },
                        { title: t.products.total, gridColumn: 'span 2', align: 'flex-end' },
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
                    variant="subtle"
                    onClick={() => dispatch(addItem())}
                >
                    <LuPlus/>
                    {t.products.addItem}
                </Button>
            </Box>
        </Box>
    )
}
