import {useAppSelector} from "@/lib/hooks";
import {
    selectClientEmail,
    selectClientName,
    selectDueDate,
    selectInvoiceNumber, selectLogoFile, selectSenderEmail, selectSenderName,
    selectSubject
} from "@/lib/features/ivoicing/invoicingSlice";
import {SimpleGrid, Text, VStack, Image, HStack} from "@chakra-ui/react";
import {DateTime} from "luxon";
import {useTranslations} from "next-intl";

export const InvoiceHeader = () => {
    const t = useTranslations('InvoiceDetails')
    const invoiceNumber = useAppSelector(selectInvoiceNumber)
    const dueDate = useAppSelector(selectDueDate)
    const subject = useAppSelector(selectSubject)
    const senderName = useAppSelector(selectSenderName)
    const senderEmail = useAppSelector(selectSenderEmail)
    const clientName = useAppSelector(selectClientName)
    const clientEmail = useAppSelector(selectClientEmail)
    const logoFile = useAppSelector(selectLogoFile)

    return (
        <VStack gap={8} width="full" overflow="hidden">
            <HStack flex="1" align="end" width="full" justify={logoFile ? "space-between" : "flex-end"}>
                {logoFile && <Image src={logoFile} alt="Logo" height="60px"/>}
                <Text fontSize="sm" color="fg.muted" alignSelf="flex-start">
                    {t('invoice', {invoiceNumber})}
                </Text>
            </HStack>

            <SimpleGrid flex="1" width="full" columns={{base: 4, md: 4}}>
                <VStack align="start" gap="1" gridColumn="span 2">
                    <Text fontSize="sm" color="fg.muted">
                        {t('dueDate')}
                    </Text>
                    <Text fontSize="md" fontWeight="semibold">
                        {DateTime.fromSQL(dueDate).toLocaleString(DateTime.DATE_MED)}
                    </Text>
                </VStack>
                <VStack align="start" gap="1" gridColumn="span 2">
                    <Text fontSize="sm" color="fg.muted">
                        {t('subject')}
                    </Text>
                    <Text fontSize="md" fontWeight="semibold">
                        {subject || '---'}
                    </Text>
                </VStack>
            </SimpleGrid>

            <SimpleGrid flex="1" width="full" columns={{base: 4, md: 4}}>
                <VStack align="start" gap="1" gridColumn="span 2">
                    <Text fontSize="sm" color="fg.muted">
                        {t('createdBy')}
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
                        {t('billedTo')}
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
