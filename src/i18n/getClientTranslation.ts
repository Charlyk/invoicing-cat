import {createTranslator} from "next-intl";

type TranslationFunction = (key: string, values?: Record<string, string | number | Date>) => string

export async function getClientTranslation(locale?: string, namespace: string = 'InvoiceDocument'): Promise<TranslationFunction> {
  const fallbackLocale = 'en';
  const unwrappedLocale = locale ?? fallbackLocale
  const messages = (await import(`../../messages/${unwrappedLocale}.json`)).default
  return createTranslator({locale: unwrappedLocale, messages, namespace: namespace})
}
