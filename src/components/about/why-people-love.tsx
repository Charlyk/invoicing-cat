import {Container, Heading, Stack, Text, List, HStack} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {LuCircleCheck} from "react-icons/lu";

export const WhyPeopleLove = () => {
    const t = useTranslations('WhyPeopleLove')

    return (
        <Container>
            <Stack gap="6" align={{sm: 'center'}} width="full" textAlign="start">
                <HStack gap="4" width="full" align="center">
                    <Heading as="h2" size={{base: '2xl', md: '4xl'}}>
                        {t('title')}
                    </Heading>
                </HStack>

                <List.Root gap="2" variant="plain" align="start" width="full">
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuCircleCheck/>
                        </List.Indicator>
                        <Text>
                            {t.rich('instantUse', {
                                bold: (chunks) => (<b>{chunks}</b>)
                            })}
                        </Text>
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuCircleCheck/>
                        </List.Indicator>
                        <Text>
                            {t.rich('privacyFirst', {
                                bold: (chunks) => (<b>{chunks}</b>)
                            })}
                        </Text>
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuCircleCheck/>
                        </List.Indicator>
                        <Text>
                            {t.rich('completelyFree', {
                                bold: (chunks) => (<b>{chunks}</b>)
                            })}
                        </Text>
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuCircleCheck/>
                        </List.Indicator>
                        <Text>
                            {t.rich('localized', {
                                bold: (chunks) => (<b>{chunks}</b>)
                            })}
                        </Text>
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuCircleCheck/>
                        </List.Indicator>
                        <Text>
                            {t.rich('offlineReady', {
                                bold: (chunks) => (<b>{chunks}</b>)
                            })}
                        </Text>
                    </List.Item>
                </List.Root>
            </Stack>
        </Container>
    )
}
