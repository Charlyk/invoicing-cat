import {Container, Flex, HStack} from "@chakra-ui/react";
import {InvoiceForm} from "@/components/invoice-form";
import {Preview} from "@/components/preview";

export default function Home() {
  return (
    <>
      <Flex flex={1} width="full">
          <Container display="flex" flex="1" width="full">
              <HStack width="full" gap="8" py={{ base: 2, md: 4 }}>
                  <InvoiceForm/>
                  <Preview/>
              </HStack>
          </Container>
      </Flex>
    </>
  );
}
