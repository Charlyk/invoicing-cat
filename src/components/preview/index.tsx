'use client'

import {VStack} from "@chakra-ui/react";
import {Invoice} from "@/components/preview/invoice";
import {useAppSelector} from "@/lib/hooks";
import {selectClient} from "@/lib/features/ivoicing/invoicingSlice";
import {useLocale} from "use-intl";

export const Preview = () => {
  const client = useAppSelector(selectClient)
  const fallbackLocale = useLocale()
  return (
    <VStack bg="bg.emphasized" align="flex-start" rounded="md" flex="1" p={{base: 4, md: 8}}>
      <Invoice locale={client?.locale ?? fallbackLocale}/>
    </VStack>
  )
}
