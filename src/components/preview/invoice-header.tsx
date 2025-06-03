import {useAppSelector} from "@/lib/hooks";
import {
    selectClientEmail,
    selectClientName,
    selectDueDate,
    selectInvoiceNumber, selectSenderEmail, selectSenderName,
    selectSubject
} from "@/lib/features/ivoicing/invoicingSlice";
import {SimpleGrid, Stack, Text, VStack} from "@chakra-ui/react";
import {DateTime} from "luxon";

export const InvoiceHeader = () => {
    const invoiceNumber = useAppSelector(selectInvoiceNumber)
    const dueDate = useAppSelector(selectDueDate)
    const subject = useAppSelector(selectSubject)
    const senderName = useAppSelector(selectSenderName)
    const senderEmail = useAppSelector(selectSenderEmail)
    const clientName = useAppSelector(selectClientName)
    const clientEmail = useAppSelector(selectClientEmail)

    return (
        <VStack gap={8} width="full" overflow="hidden">
            <Stack flex="1" align="end" width="full">
                <Text fontSize="sm" color="fg.muted">
                    Invoice {invoiceNumber}
                </Text>
            </Stack>

            <SimpleGrid flex="1" width="full" columns={{base: 4, md: 4}}>
                <VStack align="start" gap="1" gridColumn="span 2">
                    <Text fontSize="sm" color="fg.muted">
                        Due date
                    </Text>
                    <Text fontSize="md" fontWeight="semibold">
                        {DateTime.fromSQL(dueDate).toLocaleString(DateTime.DATE_MED)}
                    </Text>
                </VStack>
                <VStack align="start" gap="1" gridColumn="span 2">
                    <Text fontSize="sm" color="fg.muted">
                        Subject
                    </Text>
                    <Text fontSize="md" fontWeight="semibold">
                        {subject || '---'}
                    </Text>
                </VStack>
            </SimpleGrid>

            <SimpleGrid flex="1" width="full" columns={{base: 4, md: 4}}>
                <VStack align="start" gap="1" gridColumn="span 2">
                    <Text fontSize="sm" color="fg.muted">
                        Created by
                    </Text>
                    <Text fontSize="md" fontWeight="semibold">
                        {senderName || '---'}
                    </Text>
                    {senderEmail && (
                        <Text fontSize="md" fontWeight="semibold">
                            {senderEmail}
                        </Text>
                    )}
                </VStack>
                <VStack align="start" gap="1" gridColumn="span 2">
                    <Text fontSize="sm" color="fg.muted">
                        Billed to
                    </Text>
                    <Text fontSize="md" fontWeight="semibold">
                        {clientName || '---'}
                    </Text>
                    {clientEmail && (
                        <Text fontSize="md" fontWeight="semibold">
                            {clientEmail}
                        </Text>
                    )}
                </VStack>
            </SimpleGrid>
        </VStack>
    )
}
