'use client'

import {useEffect, useState} from 'react'
import {createTranslator} from 'next-intl'
import {useLocale} from "use-intl";

type TranslationFunction = (key: string, values?: Record<string, unknown>) => string

export function useClientTranslation(locale?: string, namespace = 'InvoiceDocument'): TranslationFunction {
  const fallbackLocale = useLocale()
  const [t, setT] = useState<TranslationFunction>(() => () => '')

  useEffect(() => {
    const loadTranslator = async () => {
      const unwrappedLocale = locale ?? fallbackLocale
      const messages = (await import(`../../messages/${unwrappedLocale}.json`)).default
      const translator = createTranslator({locale: unwrappedLocale, messages, namespace: namespace})
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setT(() => translator)
    }

    loadTranslator()
  }, [locale, namespace])

  return t
}
