'use client'

import {VStack} from "@chakra-ui/react";
import {Invoice} from "@/components/preview/invoice";

export const Preview = () => {
    return (
        <VStack bg="bg.emphasized" align="flex-start" rounded="md" flex="1" p={{ base: 4, md: 8}}>
            <Invoice/>
        </VStack>
    )
}
