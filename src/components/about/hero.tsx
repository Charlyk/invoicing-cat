import {Container, Heading, Stack, Text} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

export const AboutHero = () => {
    const t = useTranslations('AboutHero')
    return (
        <Container>
            <Stack gap="12" align={{ sm: 'center' }} width="full" textAlign="start">
                <Stack gap="6" width="full">
                    <Stack gap="4">
                        <Heading as="h1" size={{ base: '4xl', md: '6xl' }}>
                            {t('title')}
                        </Heading>
                        <Text fontSize="xl" color="fg.muted">
                            {t('subtitle')}
                        </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}
