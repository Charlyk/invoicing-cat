'use client'

import {Stack} from "@chakra-ui/react";
import {Invoice} from "@/components/preview/invoice";

export const Preview = () => {
    return (
        <Stack bg="bg.emphasized" flex="1" height="full" p={16}>
            <Invoice/>
        </Stack>
    )
}
