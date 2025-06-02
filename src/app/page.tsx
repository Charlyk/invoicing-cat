import {Container, Flex, HStack, Stack} from "@chakra-ui/react";
import {InvoiceForm} from "@/components/invoice-form";
import {Preview} from "@/components/preview";
import {NavBar} from "@/components/nav-bar";

export default function Home() {
  return (
    <>
      <Stack colorPalette="orange">
        <NavBar/>
        <Flex flex={1} width="full" pt={8}>
          <Container display="flex" flex="1" width="full">
            <HStack width="full" gap="8" py={{ base: 2, md: 4 }}>
              <InvoiceForm/>
              <Preview/>
            </HStack>
          </Container>
        </Flex>
      </Stack>
    </>
  );
}
