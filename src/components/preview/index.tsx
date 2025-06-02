'use client'

import {Box, Center} from "@chakra-ui/react";
import {InvoiceDocument} from "@/components/preview/InvoiceDocument";
import {PDFViewer} from "@react-pdf/renderer";

export const Preview = () => {
    return (
        <Center bg="gray.50" flex="1" height="full">
            <PDFViewer showToolbar={false} width="80%" height="80%">
                <InvoiceDocument/>
            </PDFViewer>
        </Center>
    )
}
