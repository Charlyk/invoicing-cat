import {Container, Heading, List, Stack} from "@chakra-ui/react";
import {LuChevronRight} from "react-icons/lu";
import {useTranslations} from "next-intl";
import locales from "@/data/locales";

export const TechnicalPerks = () => {
    const t = useTranslations('TechnicalPerks')

    return (
        <Container>
            <Stack gap="6" align={{sm: 'center'}} width="full" textAlign="start">
                <Stack gap="4" width="full" align="start">
                    <Heading as="h2" size={{base: '2xl', md: '4xl'}}>
                        {t('title')}
                    </Heading>
                </Stack>

                <List.Root gap="2" variant="plain" align="start" width="full">
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuChevronRight/>
                        </List.Indicator>
                        {t('techStack')}
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuChevronRight/>
                        </List.Indicator>
                        {t('noServers')}
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuChevronRight/>
                        </List.Indicator>
                        {t('features')}
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuChevronRight/>
                        </List.Indicator>
                        {t('localized', { languagesSize: locales.length, languages: locales.map((item) => item.value.toUpperCase()).join(', ') })}
                    </List.Item>
                    <List.Item>
                        <List.Indicator asChild color="orange.500">
                            <LuChevronRight/>
                        </List.Indicator>
                        {t('currencies')}
                    </List.Item>
                </List.Root>
            </Stack>
        </Container>
    )
}
