import {Client} from "@/lib/db";

const formatCurrencyWithClient = (
  value: number,
  client?: Client | null
): string => {
  return new Intl.NumberFormat(client?.locale || 'en-US', {
    style: 'currency',
    currency: client?.currency || 'USD',
  }).format(value);
};

export default formatCurrencyWithClient;
