'use client'

import {VStack} from "@chakra-ui/react";
import {InvoiceDetails} from "@/components/invoice-form/invoice-details";
import {InvoiceData} from "@/components/invoice-form/invoice-data";

export const InvoiceForm = () => {
    return (
        <VStack flex="1" gap={{ base: 2, md: 4 }}>
            <InvoiceDetails/>
            <InvoiceData/>
        </VStack>
    )
}
