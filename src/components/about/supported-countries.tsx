import {Container, Heading, Stack, Text} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

export const SupportedCountries = () => {
    const t = useTranslations('SupportedCountries')
    return (
        <Container>
            <Stack gap="12" align={{ sm: 'center' }} width="full" textAlign="start">
                <Stack gap="6" width="full">
                    <Stack gap="4">
                        <Heading as="h2" size={{base: '2xl', md: '4xl'}}>
                            {t('title')}
                        </Heading>
                        <Text fontSize="xl" color="fg.muted">
                            {t('paragraph')}
                        </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}
