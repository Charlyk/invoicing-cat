import {Container, Flex, HStack, Stack, Tabs} from "@chakra-ui/react";
import {InvoiceForm} from "@/components/invoice-form";
import {Preview} from "@/components/preview";
import {NavBar} from "@/components/nav-bar";
import {LuEye, LuPencil} from "react-icons/lu";
import {Footer} from "@/components/footer";
import {getServerTranslation} from "@/lib/localization";

export default async function Home({
                                     params,
                                   }: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = getServerTranslation(locale)
  return (
    <>
      <Stack colorPalette="orange">
        <NavBar/>
        <Flex flex={1} width="full" pt={8}>
          <Container display="flex" flex="1" width="full">
            <Tabs.Root hideFrom="md" width="full" defaultValue="edit">
              <Tabs.List>
                <Tabs.Trigger value="edit">
                  <LuPencil/>
                  {t.edit}
                </Tabs.Trigger>
                <Tabs.Trigger value="preview">
                  <LuEye/>
                  {t.preview}
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="edit">
                <InvoiceForm/>
              </Tabs.Content>
              <Tabs.Content value="preview">
                <Preview/>
              </Tabs.Content>
            </Tabs.Root>
            <HStack width="full" align="flex-start" hideBelow="md" gap="8" py={{ base: 2, md: 4 }}>
              <InvoiceForm/>
              <Preview/>
            </HStack>
          </Container>
        </Flex>
        <Footer/>
      </Stack>
    </>
  );
}
